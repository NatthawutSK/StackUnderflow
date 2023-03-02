<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
// const {user} = storeToRefs(useUserStore())
// const {tag} = storeToRefs(useForumStore())
const forumStore = useForumStore()
</script>

<template>
  <v-main>
    <v-container>
      <v-combobox
        v-model="forumStore.tag"
        chips
        label="Combobox"
        :items="['JavaScript', 'Java', 'Vue.js', 'Node.js']"
      ></v-combobox>
      <CardForum
       v-for="forum in forumStore.filterForum"
      :forum="forum"
      :to="`/forum/${forum.idPost}`"
      ></CardForum>
    </v-container>
  </v-main>
</template>

<style></style>
