<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import Comment from "@/components/Comment.vue";
import { ref, onBeforeMount} from "vue";
import { useForumStore } from "@/stores/forum";
import { useReportStore } from "@/stores/report";
const forumStore = useForumStore();
const route = useRoute();
const { id } = route.params;
const reportStore = useReportStore();
const s_forum = ref(null);
const dialog = ref(false);
const isDel = ref(false)
const report = ref([]);
const checkedit = ref(false)
const { logingUser } = useUserStore();
const comment = ref({
  desc: "",
  user: logingUser,
  index: parseInt(id),
});
onBeforeMount(() => {
  s_forum.value = forumStore.allForum.find((f, index) => index === parseInt(id));
});
</script>

<template>
    <v-main>
    <v-container class="mt-5 pa-10">
      <div>
        <v-card variant="outlined">
          <v-card-title >
            <v-row>
              <v-col cols="11">
                <div class="pa-6 text-h4" style="white-space: normal" v-if="!checkedit">
                  <p>{{ s_forum.title }}</p>
                </div>
                <div class="pa-6 text-h4" style="white-space: normal" v-else>
                  <v-text-field :value="s_forum.title" v-model="s_forum.title"></v-text-field>
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
                        v-if="logingUser.userName === s_forum.user.userName || logingUser.userName === 'admin'"
                        ><v-btn
                          href="/"
                          @click="
                            forumStore.deleteForum(parseInt(id));
                           isDel = !isDel
                          "
                          >Delete</v-btn
                        ></v-list-item-title
                      >
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="logingUser.userName === s_forum.user.userName "
                        ><v-btn @click="checkedit=true">Edit</v-btn></v-list-item-title
                      >
                      <v-list-item-title
                      v-if="logingUser.userName !== s_forum.user.userName && logingUser.userName !== 'admin'"
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
            <div class="text-h5 pa-5" v-if="!checkedit">
              <p>
                {{ s_forum.desc }}
              </p>
            </div>
            <div class="text-h5 pa-5" v-else>
              <v-row>
                <v-col>
                <p>
                  <v-text-field :value="s_forum.desc" v-model="s_forum.desc"></v-text-field>
                </p>
              </v-col>
              </v-row>
              <v-row class="text-end">
                <v-col>
                <v-btn class=" px-5"  @click="forumStore.editForum(s_forum.title, s_forum.desc, id) , checkedit=false">
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

              <v-list-item-title class="text-h6 my-1">{{
                s_forum.user.userName
              }}</v-list-item-title>

              <v-chip>{{ s_forum.tag }}</v-chip>

              <template v-slot:append>
                <div class="justify-self-end">
                  <v-btn
                    ><v-icon class="me-1" icon="mdi-heart"></v-icon>
                    <span class="subheading me-2">256</span></v-btn
                  >
                </div>
              </template>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
      <div class="mt-5 pa-5" v-if="logingUser.userName && logingUser.userName !== 'admin'">
        <v-card class="pa-5">
          <v-card-title>Write Comment </v-card-title>
          <v-card-text>
            <v-textarea @keyup.enter="forumStore.addComment(comment)" variant="outlined" v-model="comment.desc" ></v-textarea>
          </v-card-text>
          <div class="d-flex justify-end">
            <v-btn  @click="forumStore.addComment(comment)" color="warning">Comment</v-btn>
          </div>
        </v-card>
      </div>
      <div class="mt-5">
        <h1>
          Comments({{
            (isDel === true ? s_forum.comment.length : forumStore.fcomment(parseInt(id)).length)
          }})
        </h1>
        <Comment
          v-for="comment in (isDel === true ? s_forum.comment : forumStore.fcomment(parseInt(id)))"
          :desc="comment.desc"
          :user="comment.user"
          :comment="comment"
        ></Comment>
      </div>
    </v-container>
  </v-main>
</template>