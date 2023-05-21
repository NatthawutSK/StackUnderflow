<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import { useReplyStore } from "../stores/reply";
import { ref, onMounted } from "vue";
import Reply from "./reply.vue";
import axios from '@/plugins/axios';
import Swal from 'sweetalert2'
// const { logingUser } = useUserStore();
const route = useRoute()
const { id } = route.params
const forumStore = useForumStore();
const userStore = useUserStore()
const replyStore = useReplyStore()
const checkedit = ref(false)
const props = defineProps({
  comment: Object,
  index: Number,
});

const showReply = ref(false)



// voting Comment
const commVoteUp = async (voter_id, comm_id, gotVote_id, index) => {
  const fetchData = await axios.put('/comm/vote/up', {
    voter_id: voter_id,
    comm_id: comm_id,
    gotVote_id: gotVote_id
  })
  if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
    const sweet = await Swal.fire({
      icon: "error",
      title: fetchData.data.message,
      confirmButtonText: 'Close'
    })
  }
  else if (fetchData.data.status == "success") {
    forumStore.commentPost[index].comm_vote = fetchData.data.vote
    thumbComm.value = await checkThumbComm(comm_id, voter_id)
  }
  console.log(fetchData.data);
}

const commVoteDown = async (voter_id, comm_id, gotVote_id, index) => {
  const fetchData = await axios.put('/comm/vote/down', {
    voter_id: voter_id,
    comm_id: comm_id,
    gotVote_id: gotVote_id
        })
        if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
            })
        }
        else if (fetchData.data.status == "success") {
          forumStore.commentPost[index].comm_vote = fetchData.data.vote
            thumbComm.value = await checkThumbComm(comm_id, voter_id)
        }
        console.log(fetchData.data);
    }

    const thumbComm = ref("")
    const checkThumbComm = async (comm_id, mem_id) =>{
      console.log(comm_id, mem_id);
        const fetchData = await axios.get('/thumb/comment',{
            params: {
                comm_id: comm_id,
                mem_id:  mem_id
            }
        })
        console.log(fetchData.data.vote_status);
        return fetchData.data.vote_status
      }
      
      onMounted( async () => {
        const { comment } = props;
        thumbComm.value = await checkThumbComm(comment.comm_id, userStore.user.mem_id)
      })


</script>

<template>
  {{ comment.comm_id }}
  <!-- {{ forumStore.singlePost }} -->
  <v-card variant="outlined" class="pa-2 my-4">
    <v-card-title primary-title>
      <div>
        <v-row>
          <v-col cols="11">
            <v-icon v-if="comment.accept === 1" icon="mdi-check-circle-outline"></v-icon>
            <div class="text-wrap" style="max-width: 100%" v-if="!checkedit" v-html="comment.comm_content">
            </div>
            <div class="text-wrap pa-8 pb-16" v-else>

              <!-- <v-text-field  v-model="comment.comm_content"></v-text-field> -->
              <QuillEditor content-type="html" v-model:content="comment.comm_content" :toolbar="[
                { header: [1, 2, false] },
                'bold',
                'italic',
                'underline',
                'code-block',
                { color: [] },
                { background: [] },
              ]" theme="snow" />
              <div class="text-center">
                <v-btn class=" ms-4 mt-2  bg-teal-darken-2"
                  @click="forumStore.editComment(comment.comm_id, comment.comm_content), checkedit = !checkedit">Save</v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="1">
            <v-menu location="end" v-if="userStore.user.mem_id === comment.mem_id || userStore.user.role === 'admin'">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title class="text-h6 pa-1"><v-btn
                      @click="forumStore.delComment(comment.comm_id, id)">Delete</v-btn></v-list-item-title>
                  <v-list-item-title v-if="true" class="text-h6 pa-1"><v-btn
                      @click="checkedit = !checkedit">Edit</v-btn></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <router-link :to="{ path: `/profile/${comment.mem_id}` }" class="text-decoration-none">
            <v-avatar color="grey-darken-3"
              :image="comment.mem_pic != null ? 'http://localhost:3000/' + comment.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
              ></v-avatar>
          </router-link>
        </template>
        <router-link :to="{ path: `/profile/${comment.mem_id}` }" class="text-decoration-none">
          <v-list-item-title class="text-h6 my-1 ml-5">{{
            comment.mem_user_name
          }}</v-list-item-title>
        </router-link>
        <template v-slot:append>
          <div class="d-flex flex-column align-center">
            <v-btn
              @click="commVoteUp(userStore.user.mem_id, comment.comm_id, forumStore.singlePost.mem_id, index)"><v-icon
                class="me-1" :icon="thumbComm == 'up' ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"></v-icon>
            </v-btn>
            <h3>{{ comment.comm_vote }}</h3>
            <v-btn
              @click="commVoteDown(userStore.user.mem_id, comment.comm_id, forumStore.singlePost.mem_id, index)"><v-icon
                class="me-2" :icon="thumbComm == 'down' ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"></v-icon>
            </v-btn>
          </div>
        </template>
        <small class="ml-5">{{ forumStore.convertTime(comment.comm_created_at) }}</small>
      </v-list-item>
    </v-card-actions>
    <v-btn
      v-if="userStore.user.mem_id == forumStore.singlePost.mem_id && comment.mem_id != forumStore.singlePost.mem_id && !!!forumStore.commentPost.find((val) => { return val.accept == 1 })"
      @click="forumStore.acceptAnswer(forumStore.singlePost.post_id, comment.mem_id, comment.comm_id)">Accept</v-btn>
    <!-- <v-btn @click="showReply = !showReply">{{ showReply ? "Close Reply" : "Reply" }}</v-btn> -->
  </v-card>

  <!-- <div v-if="showReply">
    <v-card-title>Write Reply </v-card-title>
    <v-card-text class="mr-10 ">

      <QuillEditor content-type="html" v-model:content="replyStore.createReply.reply_content" :toolbar="[
        { header: [1, 2, false] },
        'bold',
        'italic',
        'underline',
        'code-block',
        { color: [] },
        { background: [] },
      ]" theme="snow" />
    </v-card-text>
    <div class="d-flex justify-end">
      <v-btn
        @click="replyStore.addReply(replyStore.createReply.reply_content, id, userStore.user.mem_id, comment.comm_id)"
        color="warning">reply</v-btn>
    </div> -->
  <!-- </div> -->
  <!-- {{ reply }} -->

  <Reply :commId="comment.comm_id" />
</template>
<style>
.ql-syntax {
  background: #414449;
  color: #b3bccc;
  word-wrap: break-word;
  white-space: pre;
  font-size: 13pt;
  tab-size: 4;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, .75);
}

.ql-syntax {
  margin: 10px;
  padding: 15px;
}

code {
  background: #ebebeb;
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
  font-size: 13pt;
}
</style>