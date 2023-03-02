<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import {useForumStore} from "@/stores/forum"
const {  logingUser } = useUserStore();
const forumStore = useForumStore()
const forum = ref({
  title: "",
  desc: "",
  tag: null,
  user:logingUser,
  idPost: forumStore.idPost,
  comment:[]

});
</script>
<template>
  <v-main>
    <v-form>
      <v-card>
        <v-card-title class="text-h5 ma-3 px-5"> Create Forum </v-card-title>
        <v-card-text @keyup.enter="forumStore.addForum(forum), $router.back()">
          <v-text-field
          variant="outlined"
            class="mx-2"
            prepend-icon="mdi-account-circle"
            label="Title"
            v-model="forum.title"
          ></v-text-field>
          <v-textarea
          variant="outlined"
            class="mx-2"
            label="Description"
            v-model="forum.desc"
            rows="4"
            prepend-icon="mdi-comment"
          ></v-textarea>
          <v-select
          variant="outlined"
            chips
            prepend-icon="mdi-tag"
            class="mx-2"
            label="Select Tag"
            :items="['JavaScript', 'Java', 'Vue.js', 'Node.js']"
            v-model="forum.tag"
          ></v-select>
        </v-card-text>
        <div></div>
        <div class="d-flex justify-center">
          <v-btn href="/"  class="mb-5 w-50" color="primary" @click="forumStore.addForum(forum)">Create Post</v-btn>
        </div>
      </v-card>
    </v-form>
  </v-main>
</template>
