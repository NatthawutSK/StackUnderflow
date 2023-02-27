<script setup>
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import { ref } from "vue";
const { logingUser } = useUserStore();
const { deleteComment } = useForumStore();
defineProps({
  desc: String,
  user: Object,
  comment: Object,
});
const dialog = ref(false)
const report = ref([])
</script>

<template>
  <v-card class="pa-2 my-4">
    <v-card-title primary-title>
      <div>
        <v-row>
          <v-col>
            <div class="text-truncate" style="max-width: 80%">
              {{ comment.desc }}
            </div>
          </v-col>
          <v-col cols="1">
            <v-menu
              location="end"
              v-if="logingUser.userName === comment.user.userName"
            >
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title class="text-h6 pa-1"
                    ><v-btn @click="deleteComment(comment, comment.index)"
                      >Delete</v-btn
                    ></v-list-item-title
                  >
                  <v-list-item-title class="text-h6 pa-1"
                    >Edit</v-list-item-title
                  >
                  <v-list-item-title class="text-h6 pa-1"
                    ><v-dialog
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
                            @click="dialog = false"
                          >
                            Send
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog></v-list-item-title
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
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title class="text-h6 my-1">{{
          user.userName
        }}</v-list-item-title>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn
              ><v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">256</span></v-btn
            >
            <span class="me-1">·</span>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
