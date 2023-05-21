<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useReplyStore } from "@/stores/reply";
import Comment from "@/components/Comment.vue";
import { ref, onMounted, } from "vue";
import { useForumStore } from "@/stores/forum";
import { useReportStore } from "@/stores/report";
const forumStore = useForumStore();
const reportStore = useReportStore();
const replyStore = useReplyStore();
const route = useRoute()
const {id} = route.params
const dialog = ref(false);
const isDel = ref(false)
const report = ref([]);
const checkedit = ref(false)
const userStore = useUserStore()
onMounted(async () => {
  forumStore.singlePost = await forumStore.fetchSinglePost(id)
  forumStore.commentPost = await forumStore.fetchComment(id)
  forumStore.thumb = await forumStore.checkThumb(id, userStore.user.mem_id)
  replyStore.reply = await replyStore.fetchReply(id);
  forumStore.arrayCom = forumStore.commentPost.slice(0, 2)
})
onMounted(forumStore.fetchTag)

</script>

<template>
    <v-main>
    <v-container class="mt-5 pa-10">
      {{ forumStore.thumb }}
      
      voter : {{ userStore.user.mem_id }}
      <br>
      vote : {{  forumStore.singlePost?.post_vote }} <br>
    <!-- {{ forumStore.commentPost }} -->
    gotVoted : {{ forumStore.singlePost?.mem_id }}<br>
    postId : {{ forumStore.singlePos?.post_id }}
    <!-- {{   forumStore.editTag }} -->
    {{ forumStore.singlePost }}
    <!-- {{ userStore.singlePost?.mem_pic }} -->
    <div>
      <v-card variant="outlined">
        <v-card-title >
            <v-row>
              <v-col cols="11">
                <!-- edit title -->
                <div class="pa-6 text-h4" style="white-space: normal" v-if="!checkedit">
                  <p>{{ forumStore.singlePost.post_title }}</p>
                </div>
                <div class="pa-6 text-h4" style="white-space: normal" v-else>
                  <v-text-field :value="forumStore.singlePost.post_title" v-model="forumStore.singlePost.post_title"></v-text-field>
                </div>
              </v-col>
              <v-col cols="1">
                <v-menu location="end">
                  <template v-slot:activator="{ props }" >
                    <v-btn icon="mdi-dots-vertical" class="mt-6" v-bind="props"></v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="userStore.user.mem_id === forumStore.singlePost.mem_id || userStore.user.role === 'admin'"
                        ><v-btn
                          @click="
                            forumStore.deleteForum(id);
                          "
                          >Delete</v-btn
                        ></v-list-item-title
                      >
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="userStore.user.mem_id === forumStore.singlePost.mem_id || userStore.user.role === 'admin'"
                        ><v-btn @click="checkedit=true">Edit</v-btn></v-list-item-title
                      >
                      <v-list-item-title
                        class="text-h6 pa-1"
                      >
                        <v-dialog
                          v-model="dialog"
                          width="50%"
                          transition="dialog-bottom-transition"
                        >
                          <template v-slot:activator="{ props }">
                            <v-btn v-bind="props">Report</v-btn>
                          </template>
                          <v-card >
                            <v-card-title>
                              <span class="text-h6">Report</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container >
                                <v-textarea label="Enter detail here" v-model="report"></v-textarea>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="dialog = false"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="dialog = false,  reportStore.addReport(report, id,forumStore.singlePost.mem_id),report=''"
                              >
                                Send
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <!-- edit desc  -->
            <div class="text-h5 pa-5" v-if="!checkedit">
              <p v-html="forumStore.singlePost.post_desc">
                 
              </p>
            </div>
            <div class="text-h5 pa-5" v-else>
              <v-row>
                <v-col>
                <p>
                  <!-- <v-text-field :value="forumStore.singlePost.post_desc" v-model="forumStore.singlePost.post_desc"></v-text-field> -->
                  <QuillEditor
                        content-type="html"
                        v-model:content="forumStore.singlePost.post_desc"
                        :toolbar="[
                            { size: ['small', false, 'large', 'huge'] },
                            'bold',
                            'italic',
                            'underline',
                            'code-block',
                            { color: [] },
                            { background: [] },
                        ]"
                        theme="snow"
                    />
                </p>
              </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
          variant="outlined"
            chips
            class="mx-2"
            label="Select Tag"
            item-title="tag_name" item-value="tag_id"
            :items="forumStore.editTag"
            v-model="forumStore.singlePost.tag_id"
            :value="forumStore.singlePost.tag_name"
          ></v-select>
          {{ forumStore.singlePost }}
                </v-col>
              </v-row>
              <v-row class="text-end">
                <v-col>
                  
                <v-btn class=" px-5"  @click="forumStore.editForum(forumStore.singlePost, id) , checkedit=false">
                save
              </v-btn>
            </v-col>
              </v-row>
              
            </div>

           
            
      
          </v-card-text>
          <v-card-actions>
            <v-list-item class="w-100 pa-4">
              <template v-slot:prepend>
                <router-link :to="{path:`/profile/${forumStore.singlePost.mem_id}`}">
                <v-avatar
                class="mr-3"
                  color="grey-darken-3"
                  :image=" forumStore.singlePost?.mem_pic != null  ? 'http://localhost:3000/' + forumStore.singlePost?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
                ></v-avatar>
              </router-link>
              </template>
              
                  <div>
                    <router-link :to="{path:`/profile/${forumStore.singlePost.mem_id}`}" class="text-decoration-none">
                      <v-list-item-title class="text-h6 my-1">{{forumStore.singlePost.mem_user_name}}</v-list-item-title>
                    </router-link>
                    <v-chip>{{ forumStore.singlePost.tag_name }}</v-chip>
                 </div>
                 
                 
                 <template v-slot:append>
                   <div class="d-flex flex-column align-center">
                     <v-btn  @click="forumStore.postVoteUp(userStore.user.mem_id, forumStore.singlePost.post_id, forumStore.singlePost.mem_id)"
                     ><v-icon class="me-1"  :icon="forumStore.thumb == 'up' ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"></v-icon>
                    </v-btn>
                    <h3>{{forumStore.singlePost.post_vote}}</h3>
                    <v-btn @click="forumStore.postVoteDown(userStore.user.mem_id, forumStore.singlePost.post_id, forumStore.singlePost.mem_id)"
                    ><v-icon class="me-2"  :icon="forumStore.thumb == 'down' ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"></v-icon>
                  </v-btn>
                </div>
              </template>
              <small>{{ forumStore.convertTime(forumStore.singlePost.post_created_at) }}</small>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
      <div class="mt-5 pa-5" v-if="true">
        <v-card class="pa-5">
          {{useUserStore.user}}
          <v-card-title>Write Comment </v-card-title>
          <v-card-text class="pb-10">
            <QuillEditor
                        content-type="html"
                        v-model:content="forumStore.createComment.comm_content"
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
          </v-card-text>
          <div class="d-flex justify-end">
            <v-btn  @click="forumStore.addComment(forumStore.createComment.comm_content, userStore.user.mem_id, forumStore.singlePost.post_id) " color="warning">Comment</v-btn>
          </div>
        </v-card>
      </div>
      {{ forumStore.createComment.comm_content }}
      <div class="mt-5">
        
        <h1>
          Comments({{
            forumStore.computeComm
          }})
        </h1>
        {{ forumStore.cntLoad }}
        {{ forumStore.computeComm }}
        <Comment
          v-for="comment,index in forumStore.arrayCom"
          :comment="comment"
          :index="index"
         
        ></Comment>
        <v-btn v-if="forumStore.computeComm > forumStore.cntLoad" @click="forumStore.loadMoreComment(id)">load more</v-btn>
      </div>
    </v-container>
  </v-main>
</template>
<style>
    .ql-editor{
        min-height: 150px;
    }
</style>