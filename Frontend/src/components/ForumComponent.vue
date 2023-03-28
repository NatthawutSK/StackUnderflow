<script setup>
import { useRoute } from "vue-router";
// import { useUserStore } from "@/stores/user";
import Comment from "@/components/Comment.vue";
import { ref, onMounted, } from "vue";
import { useForumStore } from "@/stores/forum";
// import { useReportStore } from "@/stores/report";
const forumStore = useForumStore();
// const reportStore = useReportStore();
const route = useRoute()
const {id} = route.params
const dialog = ref(false);
const isDel = ref(false)
const report = ref([]);
const checkedit = ref(false)
onMounted(async () => {
  forumStore.singlePost = await forumStore.fetchSinglePost(id)
  forumStore.commentPost = await forumStore.fetchComment(id)
})
onMounted(forumStore.fetchTag)

</script>

<template>
    <v-main>
    <v-container class="mt-5 pa-10">
    {{ forumStore.commentPost }}
      <!-- {{ singlePost }} -->
      <!-- {{   forumStore.editTag }} -->
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
                        v-if="true"
                        ><v-btn
                          href="/"
                          @click="
                            forumStore.deleteForum(id);
                          "
                          >Delete</v-btn
                        ></v-list-item-title
                      >
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="true"
                        ><v-btn @click="checkedit=true">Edit</v-btn></v-list-item-title
                      >
                      <v-list-item-title
                      v-if="true"
                        class="text-h6 pa-1"
                      >
                        <v-dialog
                          v-model="dialog"
                          width="auto"
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
                              <v-container>
                                <v-checkbox
                                  v-model="report"
                                  label="Harassment"
                                  value="Harassment"
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="report"
                                  label="Threatening violence"
                                  value="Threatening violence"
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="report"
                                  label="break rule"
                                  value="break rule"
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="report"
                                  label="Spam"
                                  value="Spam"
                                ></v-checkbox>
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
                                @click="dialog = false,  reportStore.addReport(report, id)"
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
                  <v-text-field :value="forumStore.singlePost.post_desc" v-model="forumStore.singlePost.post_desc"></v-text-field>
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
                <v-avatar
                  color="grey-darken-3"
                  image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-avatar>
              </template>

              <v-list-item-title class="text-h6 my-1">{{  forumStore.singlePost.mem_user_name  }}</v-list-item-title>
              <v-chip>{{ forumStore.singlePost.tag_name }}</v-chip>

              <template v-slot:append>
                <div class="justify-self-end">
                  <v-btn @click="forumStore.addLikePost(id)"
                    ><v-icon class="me-1" icon="mdi-heart"></v-icon>
                    <span class="subheading me-2">{{ forumStore.singlePost.post_like }}</span></v-btn
                  >
                </div>
              </template>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
      <div class="mt-5 pa-5" v-if="true">
        <v-card class="pa-5">
          <v-card-title>Write Comment </v-card-title>
          <v-card-text>
            <v-textarea  variant="outlined" v-model="forumStore.createComment.comm_content" ></v-textarea>
          </v-card-text>
          <div class="d-flex justify-end">
            <v-btn  @click="forumStore.addComment(forumStore.createComment.comm_content, forumStore.singlePost.mem_id, forumStore.singlePost.post_id) " color="warning">Comment</v-btn>
          </div>
        </v-card>
      </div>
      {{ forumStore.createComment.comm_content }}
      <div class="mt-5">
        <h1>
          Comments({{
            forumStore.commentPost.length
          }})
        </h1>
        
        <Comment
          v-for="comment in forumStore.commentPost"
          :comment="comment"
        ></Comment>
      </div>
    </v-container>
  </v-main>
</template>