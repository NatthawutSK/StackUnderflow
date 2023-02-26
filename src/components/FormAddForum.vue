<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";
import {useForumStore} from "../stores/forum"
const { theme, user } = storeToRefs(useUserStore());
const {  logingUser } = useUserStore();
const { addForum} = useForumStore()
const forum = ref({
  title: "",
  desc: "",
  tag: null,
  user:logingUser,
  comment:[]

});
</script>
<template>
  <v-main>
    <v-form>
      <v-card>
        <v-card-title class="text-h5 ma-3 px-5"> Create Forum </v-card-title>
        <v-card-text>
          <v-text-field
            class="mx-2"
            prepend-icon="mdi-account-circle"
            label="Title"
            v-model="forum.title"
          ></v-text-field>
          <v-textarea
            class="mx-2"
            label="Description"
            v-model="forum.desc"
            rows="4"
            prepend-icon="mdi-comment"
          ></v-textarea>
          <v-select
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
          <v-btn class="mb-5 w-50" color="primary" @click="addForum(forum)">Create Post</v-btn>
        </div>
      </v-card>
    </v-form>
  </v-main>
</template>
