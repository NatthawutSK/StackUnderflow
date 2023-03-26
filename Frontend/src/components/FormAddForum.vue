<script setup>
import { ref, onMounted } from "vue";
// import { useUserStore } from "@/stores/user";
import {useForumStore} from "@/stores/forum"
// const {  logingUser } = useUserStore();
const forumStore = useForumStore()
onMounted(forumStore.fetchTag)
const forum = ref({
  post_title: "",
  post_desc: "",
  mem_id: 1,
  tag_id: {tag_id:0, tag_name:"Select Tag"}

});
// post_title, post_desc, mem_id, tag_id

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
            v-model="forum.post_title"
          ></v-text-field>
          <v-textarea
          variant="outlined"
            class="mx-2"
            label="Description"
            v-model="forum.post_desc"
            rows="4"
            prepend-icon="mdi-comment"
          ></v-textarea>
          <v-select
          variant="outlined"
            chips
            prepend-icon="mdi-tag"
            class="mx-2"
            label="Select Tag"
            item-title="tag_name" item-value="tag_id"
            :items="forumStore.createTag"
            v-model="forum.tag_id"
            aria-required="true"
          ></v-select>
          <!-- {{ forumStore.allTag }} -->
        </v-card-text>
        {{ forum.post_title}}<br/>
        {{ forum.post_desc }}<br/>
        {{ forum.mem_id }}<br/>
        {{ forum.tag_id }}
        <div></div>
        <div class="d-flex justify-center">
          <v-btn href="/"   class="mb-5 w-50" color="warning" @click="forumStore.addForum(forum)">Create Post</v-btn>
        </div>
      </v-card>
    </v-form>
  </v-main>
</template>
