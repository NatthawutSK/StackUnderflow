<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from "@vuelidate/validators";
const userStore = useUserStore();
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const dialog = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false)
const step = ref(1)
const route = useRoute();
const { id } = route.params;
onMounted(async () => {
  userStore.profiledata = await userStore.getprofiledata(id);
});
const edited = ref({
  fname: userStore.user?.mem_fname,
  lname: userStore.user?.mem_lname,
  username: userStore.user?.mem_user_name,
});
const rule = {
  fname: {
    required,
    minLength: minLength(5),
    maxLength: maxLength(15),
  },
  lname: {
    required,
    minLength: minLength(5),
    maxLength: maxLength(15),
  },
  username: {
    required,
    minLength: minLength(5),
    maxLength: maxLength(15),
  },
};
const v$ = useVuelidate(rule, edited);
const complexPassword = (value) => {
  if (
    !(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))
  ) {
    return false;
  }
  return true;
};
const rulePass = {
  opassword: {
    required,
    minLength: minLength(8),
  },
  npassword: {
    required,
    minLength: minLength(8),
    complex: helpers.withMessage("Your password too ez", complexPassword),
  },
  cfpassword: {
    required,
    sameAs: helpers.withMessage("Your password not match", function (val) {
      return val == password.value.npassword;
    }),
  },
};
const password = ref({
  opassword: "",
  npassword: "",
  cfpassword: "",
});
const vp$ = useVuelidate(rulePass, password);
</script>
<template>
  <v-container>
    <v-main>
      user: {{ userStore.user }}<br />
      other : {{ userStore.profiledata.user }}
      {{ userStore.user.mem_pic == null }}
      <v-row>
        <v-col >
          <v-card class="mx-auto mb-6 d-flex pa-5" rounded="0">
            <div class="d-flex flex-column justify-center">
              <v-avatar color="grey" size="150" class="ma-6">
                <v-img v-if="userStore.user?.mem_id == id" cover
                  :src="userStore.imageURL ? userStore.imageURL : userStore.user.mem_pic ? 'http://localhost:3000/' + userStore.user.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">

                </v-img>
                <v-img v-else cover
                  :src="userStore.profiledata.user?.mem_pic != null ? 'http://localhost:3000/' + userStore.profiledata.user?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
                </v-img>
              </v-avatar>
              <div class="d-flex justify-center">

                <button type="button" class="btn-warning d-flex justify-center">
                  <v-icon icon="mdi-camera-plus"></v-icon> &ensp; Upload File
                  <input  type="file" accept="image/png, image/jpeg, image/webp" @change="userStore.previewImage">
                </button>
              </div>
              <!-- <div v-if="userStore.user?.mem_id == id">
                <input  type="file" accept="image/png, image/jpeg, image/webp" @change="userStore.previewImage">
              </div> -->

            </div>
            <div>
              <v-card-title class="mt-5">
                Username:
                {{
                  id == userStore.user.mem_id
                  ? userStore.user.mem_user_name
                  : userStore.profiledata.user
                    ?.mem_user_name
                }}
              </v-card-title>
              <v-card-title>
                Name:
                {{
                  id == userStore.user.mem_id
                  ? userStore.user?.mem_fname
                  : userStore.profiledata.user?.mem_fname
                }}
                {{
                  id == userStore.user.mem_id
                  ? userStore.user?.mem_lname
                  : userStore.profiledata.user?.mem_lname
                }}
              </v-card-title>
              <v-card-title>
                Email:
                {{
                  id == userStore.user.mem_id
                  ? userStore.user.mem_email
                  : userStore.profiledata.user?.mem_email
                }}
              </v-card-title>
              <v-card-title>
                Role: {{ userStore.profiledata.user?.role }}
              </v-card-title>


              <v-btn @click="userStore.changePic(userStore.user.mem_id)" v-if="userStore.imageURL">save</v-btn>
              <div class="d-flex">
                <div v-if="id != userStore.user.mem_id">
                  <v-btn class="ms-2" v-if="!!!userStore.profiledata.follower?.find(
                    ({ mem_id }) => {
                      return (
                        mem_id ==
                        userStore.user.mem_id
                      );
                    }
                  )
                    " @click="
    userStore.follow(
      userStore.profiledata.user.mem_id,
      userStore.user.mem_id
    )
    ">Follow</v-btn>
                  <v-btn v-if="!!userStore.profiledata.follower?.find(
                    ({ mem_id }) => {
                      return (
                        mem_id ==
                        userStore.user.mem_id
                      );
                    }
                  )
                    " @click="
    userStore.follow(
      userStore.profiledata.user.mem_id,
      userStore.user.mem_id
    )
    ">Unfollow</v-btn>
                </div>
                <v-dialog v-else v-model="dialog3" persistent width="1024">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">Change Password</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Change Password</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-text-field label="Password" v-model="password.opassword" :type="show ? 'text' : 'password'
                          " :append-icon="show
    ? 'mdi-eye'
    : 'mdi-eye-off'
    " @click:append="show = !show" :error-messages="vp$?.opassword?.$errors.map(
    (e) => e.$message
  )
    " @input="vp$?.opassword?.$touch"></v-text-field>
                        <v-text-field label="New Password" v-model="password.npassword" :type="show2 ? 'text' : 'password'
                          " :append-icon="show2
    ? 'mdi-eye'
    : 'mdi-eye-off'
    " @click:append="show2 = !show2" :error-messages="vp$?.npassword?.$errors.map(
    (e) => e.$message
  )
    " @input="vp$?.npassword?.$touch"></v-text-field>
                        <v-text-field label="Confirm Password" v-model="password.cfpassword" :type="show3 ? 'text' : 'password'
                          " :append-icon="show3
    ? 'mdi-eye'
    : 'mdi-eye-off'
    " @click:append="show3 = !show3" :error-messages="vp$?.cfpassword?.$errors.map(
    (e) => e.$message
  )
    " @input="vp$?.cfpassword?.$touch"></v-text-field>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="dialog3 = false">
                        Close
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="
                        (dialog3 = false),
                        userStore.changePassword(
                          password,
                          vp$.$invalid
                        )
                        ">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model=dialog4 persistent width="1024">
                  <template v-slot:activator="{ props }">
                    <v-btn v-if="id == userStore.user.mem_id" color="primary" v-bind="props">
                      Edit Profile
                    </v-btn>
                  </template>
                  <v-form v-if="id == userStore.user.mem_id">
                    <v-card>
                      <v-card-title class="text-h5 ma-3 px-5">
                        Edit Profile
                      </v-card-title>
                      <v-card-text @keyup.enter="userStore.editUser(edited)">
                        <v-row>
                          <v-col cols="6">
                            <v-text-field variant="outlined" label="First Name" outlined dense autocomplete="false"
                              class="mt-4" clearable v-model="edited.fname" :error-messages="v$?.fname?.$errors.map(
                                (e) => e.$message
                              )
                                " @input="v$?.fname?.$touch" />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field variant="outlined" label="Last Name" outlined dense autocomplete="false"
                              class="mt-4" clearable v-model="edited.lname" :error-messages="v$?.lname?.$errors.map(
                                (e) => e.$message
                              )
                                " @input="v$?.lname?.$touch" />
                          </v-col>
                        </v-row>
                        <v-text-field label="Username" variant="outlined" outlined dense autocomplete="false" class="mt-4"
                          clearable v-model="edited.username" :error-messages="v$?.username?.$errors.map((e) => e.$message)
                            " @input="v$?.username?.$touch" />
                      </v-card-text>
                      <div class="d-flex justify-end me-5 pa-3">
                        <v-btn @click="
                          v$.$touch(),
                          userStore.updateprofile(edited, v$.$invalid),
                          dialog4 = !dialog4
                          " class="mb-5" color="primary">Save</v-btn>
                        <v-btn @click="dialog4 = !dialog4">Close</v-btn>
                      </div>
                    </v-card>
                  </v-form>
                </v-dialog>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="pa-5">
            <v-row>
              <v-col cols="6">
                <v-dialog v-model="dialog" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-card v-bind="props">
                      <v-card-title class="text-h5 mb-5">
                        Follower
                      </v-card-title>
                      <v-card-text class="text-h6 mb-5">
                        {{
                          userStore.profiledata
                            .follower?.length
                        }}
                      </v-card-text>
                    </v-card>
                  </template>

                  <v-card width="300" class="text-h overflow-auto pa-5">
                    <v-card-title>Follower</v-card-title>
                    <v-row v-for="follower in userStore
                          .profiledata.follower">
                      <v-col>
                        <router-link :to="{
                          path: `/profile/${follower.mem_id}`,
                        }" class="text-decoration-none">
                          <v-card-text>
                            {{
                              follower.mem_user_name
                            }}
                          </v-card-text>
                        </router-link>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-btn color="primary" block @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col>
                <v-dialog v-model="dialog2" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-card v-bind="props">
                      <v-card-title class="text-h5 mb-5">
                        Following
                      </v-card-title>
                      <v-card-text class="text-h6 mb-5">
                        {{
                          userStore.profiledata
                            .followby?.length
                        }}
                      </v-card-text>
                    </v-card>
                  </template>

                  <v-card width="300" class="text-h overflow-auto pa-5">
                    <v-card-title>Follower</v-card-title>
                    <v-row v-for="followby in userStore
                          .profiledata.followby">
                      <v-col>
                        <router-link :to="{
                          path: `/profile/${followby.mem_id}`,
                        }" class="text-decoration-none">
                          <v-card-text>
                            {{
                              followby.mem_user_name
                            }}
                          </v-card-text>
                        </router-link>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-btn color="primary" block @click="dialog2 = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card class="mb-4" @click="step = 1">

                  <v-card-title class="text-h5 mb-4">
                    Question
                  </v-card-title>
                  <v-card-text class="text-h6">
                    {{ userStore.profiledata.question }}
                  </v-card-text>

                </v-card>
              </v-col>
              <v-col>
                <v-card @click="step = 2">
                  <v-card-title class="text-h5 mb-4">
                    Answer
                  </v-card-title>

                  <v-card-text class="text-h6">
                    {{
                      userStore.profiledata.answer
                    }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-form v-if="id == userStore.user.mem_id">
        <v-card>
          <v-card-title class="text-h5 ma-3 px-5">
            Edit Profile
          </v-card-title>
          <v-card-text @keyup.enter="userStore.editUser(edited)">
            <v-row>
              <v-col cols="6">
                <v-text-field variant="outlined" label="First Name" outlined dense autocomplete="false" class="mt-4"
                  clearable v-model="edited.fname" :error-messages="v$?.fname?.$errors.map(
                    (e) => e.$message
                  )
                    " @input="v$?.fname?.$touch" />
              </v-col>
              <v-col cols="6">
                <v-text-field variant="outlined" label="Last Name" outlined dense autocomplete="false" class="mt-4"
                  clearable v-model="edited.lname" :error-messages="v$?.lname?.$errors.map(
                    (e) => e.$message
                  )
                    " @input="v$?.lname?.$touch" />
              </v-col>
            </v-row>
            <v-text-field label="Username" variant="outlined" outlined dense autocomplete="false" class="mt-4" clearable
              v-model="edited.username" :error-messages="v$?.username?.$errors.map((e) => e.$message)
                " @input="v$?.username?.$touch" />
          </v-card-text>
          <div class="d-flex justify-center">
            <v-btn @click="
              v$.$touch(),
              userStore.updateprofile(edited, v$.$invalid)
              " class="mb-5 w-50" color="primary">Save</v-btn>
          </div>
        </v-card>
      </v-form> -->
      <v-window v-model="step">
        <v-window-item :value="1">
          <p class="text-h5 mb-3">Top Question</p>
          <v-card v-if="userStore.profiledata.question > 0" class="text-decoration-none pa-5 ma-3"
            v-for="question in userStore.profiledata.top_question">
            <div class="d-flex justify-center align-center text-decoration-none">
              <div class="d-flex align-center"><v-icon icon="mdi-thumb-up"></v-icon>
                <p class="ms-3">{{ question.post_vote }}</p>
              </div>
              <v-card-text>
                <p class="text-h6">{{ question.post_title }}</p>
              </v-card-text>

              <v-btn :to="{
                path: `/forum/${question.post_id}`
              }">Go To Post</v-btn>

            </div>
          </v-card>
          <p v-else>You don't have any Question</p>
        </v-window-item>

        <v-window-item :value="2">
          <p class="text-h5 mb-3">Top Answer</p>
          <v-card v-if="userStore.profiledata.answer > 0" v-for="answer in userStore.profiledata.top_answer"
            class="pa-5 ma-3">
            <div class="d-flex justify-center align-center">
              <div class="d-flex align-center">
                <v-icon v-if="answer.accept === 1" icon="mdi-check-decagram"></v-icon>
                <p class="ms-3">{{ answer.comm_vote }}</p>
              </div>
              <v-card-text>
                <p class="text-h6" v-html="answer.comm_content"></p>
              </v-card-text>

              <v-btn :to="{
                path: `/forum/${answer.post_id}`
              }">Go To Post</v-btn>

            </div>
          </v-card>
          <p v-else>You don't have any Answer</p>
        </v-window-item>
      </v-window>



    </v-main>
  </v-container>
</template>
<script></script>
<style scoped>
.btn-warning{
  width: 60%;
  position: relative;
  padding: 5px;
  font-size: 15px;
  line-height: 1.5;
  border-radius: 3px;
  color: #fff;
  background-color: #ffc100;
  border: 0;
  transition: 0.2s;
  overflow: hidden; 
}

.btn-warning input[type = "file"]{
  cursor: pointer;
  position: absolute;
  left: 0%;
  top: 0%;
  transform: scale(3);
  opacity: 0;
}

.btn-warning:hover{
  background-color: #d9a400;
}
</style>