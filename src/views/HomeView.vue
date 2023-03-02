<script setup>
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
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
