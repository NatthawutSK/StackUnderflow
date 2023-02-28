<!-- <template></template> -->

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Comment from "../components/Comment.vue";
import { ref, onBeforeMount, reactive, onUpdated } from "vue";
import { useForumStore } from "../stores/forum";
const {
  forum,
  allForum,
  allComment,
  addForum,
  addComment,
  fcomment,
  deleteForum,
  addReport
} = useForumStore();
const route = useRoute();
const { id } = route.params;
const s_forum = ref(null);
const dialog = ref(false);
const report = ref([]);

const { theme } = storeToRefs(useUserStore());
const { toggleTheme, login, logout, logingUser } = useUserStore();
const comment = ref({
  desc: "",
  user: logingUser,
  index: parseInt(id),
});
onBeforeMount(() => {
  s_forum.value = allForum.find((f, index) => index === parseInt(id));
});
</script>

<template>
  <v-main>
    <v-container class="mt-5 pa-10">
      <div>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="11">
                <div class="pa-6 text-h4" style="white-space: normal">
                  <p>{{ s_forum.title }}</p>
                </div>
              </v-col>
              <v-col cols="1">
                <v-menu location="end">
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="logingUser.userName === s_forum.user.userName"
                        ><v-btn
                          href="/"
                          @click="
                            deleteForum(parseInt(id));
                           
                          "
                          >Delete</v-btn
                        ></v-list-item-title
                      >
                      <v-list-item-title
                        class="text-h6 pa-1"
                        v-if="logingUser.userName === s_forum.user.userName"
                        ><v-btn>Edit</v-btn></v-list-item-title
                      >
                      <v-list-item-title
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
                          <v-card>
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
                                @click="dialog = false,  addReport(report, id)"
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
            <div class="text-h5 pa-5">
              <p>
                {{ s_forum.desc }}
              </p>
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
      <div class="mt-5 pa-5" v-if="!logingUser.user">
        <v-card class="pa-5">
          <v-card-title> </v-card-title>
          <v-card-text>
            <v-textarea v-model="comment.desc"></v-textarea>
          </v-card-text>
          <div class="d-flex justify-end">
            <v-btn @click="addComment(comment)" color="success">Comment</v-btn>
          </div>
        </v-card>
      </div>
      <div class="mt-5">
        <h1>
          Comments({{
            fcomment(parseInt(id)).length
          }})
        </h1>
        <Comment
          v-for="comment in fcomment(parseInt(id))"
          :desc="comment.desc"
          :user="comment.user"
          :comment="comment"
        ></Comment>
      </div>
    </v-container>
  </v-main>
</template>

<style></style>
