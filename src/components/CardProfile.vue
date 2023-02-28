<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
const userStore = useUserStore();
const show = ref(false);
const edited = ref({
  fname : userStore.logingUser.fname,
  lname : userStore.logingUser.lname,
  userName : userStore.logingUser.userName,
  email : userStore.logingUser.email,
  password: userStore.logingUser.password
})



</script>
<template>
  <v-container>
    <v-card class="mx-auto" max-width="434" rounded="0">
      <v-img
        height="100%"
        cover
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-avatar color="grey" size="150" rounded="0">
          <v-img
            cover
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
          ></v-img>
        </v-avatar>
        <v-list-item
          class="text-white"
          title="Marcus Obrien"
          subtitle="Network Engineer"
        ></v-list-item>
      </v-img>
    </v-card>
    <v-spacer></v-spacer>
    <v-main>
      <v-form>
        <v-card>
          <v-card-title class="text-h5 ma-3 px-5"> Edit Profile </v-card-title>
          <v-card-text @keyup.enter="userStore.editUser(edited), $router.back()">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                variant="outlined"
                  label="First Name"
                  outlined
                  dense          
                  autocomplete="false"
                  class="mt-4"
                  clearable
                  v-model="edited.fname"
                  
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                variant="outlined"
                  label="Last Name"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                  clearable
                  v-model="edited.lname"
                />
              </v-col>
            </v-row>
                <v-text-field
                variant="outlined"
                  label="Email"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                  clearable
                  v-model="edited.email"
                />
                <v-text-field
                  label="Username"
                  variant="outlined"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                  clearable
                  v-model="edited.userName"
                />
                <v-text-field
                variant="outlined"
                  label="Password"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                  clearable
                  :type="show ?'text': 'password'"
                  :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                  @click:append="show=!show"
                  v-model="edited.password"
                />
          </v-card-text>
          <div class="d-flex justify-center">
            <v-btn @click="userStore.editUser(edited)" class="mb-5 w-50" color="primary"  >Save</v-btn>
        </div>
        </v-card>
      </v-form>
    </v-main>
  </v-container>
</template>
<script></script>
