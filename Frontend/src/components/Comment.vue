<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import { useReplyStore } from "../stores/reply";
import { ref, onMounted } from "vue";
import Reply from "./reply.vue";
// const { logingUser } = useUserStore();
const route = useRoute()
const {id} = route.params
const forumStore = useForumStore();
const userStore = useUserStore()
const replyStore = useReplyStore()
const checkedit = ref(false)
defineProps({
  comment: Object,
  index: Number,
  reply:Array
});


</script>

<template>
  <!-- {{ replyStore.reply }} -->
  <!-- {{ forumStore.singlePost }} -->
  <v-card variant="outlined" class="pa-2 my-4">
    <v-card-title primary-title>
      <div>
        <v-row>
          <v-col cols="11">
            <v-icon v-if="comment.accept === 1" icon="mdi-check-circle-outline"></v-icon>
              <div class="text-wrap" style="max-width: 100%" v-if="!checkedit" v-html="comment.comm_content">
              </div>
            <div class="text-wrap pa-8 pb-16"  v-else>
              
              <!-- <v-text-field  v-model="comment.comm_content"></v-text-field> -->
              <QuillEditor
                        content-type="html"
                        v-model:content="comment.comm_content"
                        :toolbar="[
                          { header: [1, 2, false] },
                            'bold',
                            'italic',
                            'underline',
                            'code-block',
                            { color: [] },
                            { background: [] },
                        ]"
                        theme="snow"
                    />
                    <div class="text-center">
            <v-btn class=" ms-4 mt-2  bg-teal-darken-2" @click="forumStore.editComment(comment.comm_id, comment.comm_content), checkedit = !checkedit">Save</v-btn>
          </div>
            </div>
          </v-col>
          <v-col cols="1">
            <v-menu
              location="end"
              v-if="userStore.user.mem_id === comment.mem_id || userStore.user.role === 'admin'"
            >
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title class="text-h6 pa-1"
                    ><v-btn @click="forumStore.delComment(comment.comm_id, id)"
                      >Delete</v-btn
                    ></v-list-item-title
                  >
                  <v-list-item-title v-if="true" class="text-h6 pa-1"
                    ><v-btn @click="checkedit = !checkedit">Edit</v-btn></v-list-item-title
                  >
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
          <router-link :to="{path:`/profile/${comment.mem_id}`}" class="text-decoration-none">
          <v-avatar
            color="grey-darken-3"
            :image=" comment.mem_pic != null  ? 'http://localhost:3000/' + comment.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
          ></v-avatar>
        </router-link>
        </template>
        <router-link :to="{path:`/profile/${comment.mem_id}`}" class="text-decoration-none">
        <v-list-item-title class="text-h6 my-1 ml-5">{{
          comment.mem_user_name
        }}</v-list-item-title>
        </router-link>
        <template v-slot:append>
          <div class="justify-self-end">
                  <v-btn  @click="forumStore.commVoteUp(userStore.user.mem_id, comment.comm_id, forumStore.singlePost.mem_id, index)"
                    ><v-icon class="me-1" icon="mdi-arrow-up-drop-circle"></v-icon>
                  </v-btn>
                  <h3>{{comment.comm_vote}}</h3>
                  <v-btn @click="forumStore.commVoteDown(userStore.user.mem_id, comment.comm_id, forumStore.singlePost.mem_id, index)"
                    ><v-icon class="me-1" icon="mdi-arrow-down-drop-circle"></v-icon>
                  </v-btn>
                </div>
              </template>
              <small class="ml-5">{{ forumStore.convertTime(comment.comm_created_at) }}</small>
            </v-list-item>
    </v-card-actions>
    <v-btn v-if="userStore.user.mem_id == forumStore.singlePost.mem_id && comment.mem_id != forumStore.singlePost.mem_id && !!!forumStore.commentPost.find((val)=>{return val.accept==1})"
      @click="forumStore.acceptAnswer(forumStore.singlePost.post_id, comment.mem_id,comment.comm_id)"
      >Accept</v-btn>
    </v-card>


    <Reply  :reply="reply"
            :commId="comment.comm_id"/>


</template>
<style>
.ql-syntax{
  background: #414449;
  color: #b3bccc;
  word-wrap: break-word;
  white-space: pre;
  font-size: 13pt;
  tab-size: 4;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, .75);
}
.ql-syntax{
  margin:10px ;
  padding: 15px;
}
code{
  background: #ebebeb;
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
  font-size: 13pt;
}

</style>