<script setup>
import { ref, onMounted,computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
const userStore = useUserStore();

const show = ref(false);
const dialog = ref(false)
const dialog2 = ref(false)
const route = useRoute()
const {id} = route.params
const edited = ref({
    fname: userStore.logingUser?.fname,
    lname: userStore.logingUser?.lname,
    userName: userStore.logingUser?.userName,
    email: userStore.logingUser?.email,
    password: userStore.logingUser?.password,
});
onMounted(async()=>{
  userStore.profiledata = await userStore.getprofiledata(id)
});
</script>
<template>
    <v-container>
        <v-main>
          {{ userStore.user }}<br>
          {{ userStore.profiledata.user }}
            <v-row>
                <v-col>
                    <v-card class="mx-auto mb-6 d-flex pa-5" rounded="0">
                        <div class="d-flex justify-center">
                            <v-avatar color="grey" size="150" class="ma-6">
                                <v-img
                                    cover
                                    src="https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"
                                ></v-img>
                            </v-avatar>
                        </div>
                        <div>
                            <v-card-title class="mt-5">
                                Name: {{  userStore.profiledata.user?.mem_user_name }}
                            </v-card-title>
                            <v-card-title>
                                Email: {{ userStore.profiledata.user?.mem_email }}
                            </v-card-title>
                            <v-card-title>
                                Role: {{ userStore.profiledata.user?.role }}
                            </v-card-title>
                           
                            {{ !!userStore.profiledata.follower?.find(({mem_id})=>{return mem_id == userStore.user.mem_id}) }}
                            <div v-if="id != userStore.user.mem_id">
                              <v-btn v-if="!!!userStore.profiledata.follower?.find(({mem_id})=>{return mem_id == userStore.user.mem_id})" @click="userStore.follow(userStore.profiledata.user.mem_id,userStore.user.mem_id)">Follow</v-btn>
                              <v-btn v-if="!!userStore.profiledata.follower?.find(({mem_id})=>{return mem_id == userStore.user.mem_id})" @click="userStore.follow(userStore.profiledata.user.mem_id,userStore.user.mem_id)">Unfollow</v-btn>
                            </div>
                        </div>
                    </v-card>
                </v-col>
               
                <v-col>
                    <v-card class="pa-5">
                        <v-row>
                            <v-col cols="6">
                                <!-- <v-card-title class="text-h5">
                                    Follower
                                </v-card-title>
                                <v-card-text class="text-h6">
                                    {{ userStore.follower }}
                                </v-card-text> -->
                                <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-card v-bind="props">
        <v-card-title class="text-h5">
          Follower
      </v-card-title>
      <v-card-text class="text-h6">
          {{ userStore.profiledata.follower?.length }}
      </v-card-text>
    </v-card>
     
      </template>
      
      <v-card width="300"  class="text-h overflow-auto pa-5 ">
        <v-card-title>Follower</v-card-title>
        <v-row v-for="follower in userStore.profiledata.follower">
        <v-col>
          <router-link :to="{path:`/profile/${follower.mem_id}`}" class="text-decoration-none">
        <v-card-text class="text-black">
          {{ follower.mem_user_name }}
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
                                <v-dialog
      v-model="dialog2"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-card v-bind="props">
        <v-card-title class="text-h5">
          Following
      </v-card-title>
      <v-card-text class="text-h6">
          {{ userStore.profiledata.followby?.length }}
      </v-card-text>
    </v-card>
     
      </template>
      
      <v-card width="300"  class="text-h overflow-auto pa-5 ">
        <v-card-title>Follower</v-card-title>
        <v-row v-for="followby in userStore.profiledata.followby">
        <v-col>
          <router-link :to="{path:`/profile/${followby.mem_id}`}" class="text-decoration-none">
        <v-card-text class="text-black">
          {{ followby.mem_user_name }}
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
                                <v-card-title class="text-h5">
                                    Question
                                </v-card-title>
                                <v-card-text class="text-h6">
                                    {{ userStore.profiledata.question }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-title class="text-h5">
                                    Answer
                                </v-card-title>
                                <v-card-text class="text-h6"> sad </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-main>
    </v-container>
</template>
<script></script>
