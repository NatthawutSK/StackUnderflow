<script setup>
import { onMounted } from "vue";
import { useForumStore } from "@/stores/forum";
import { useUserStore } from "@/stores/user";
import CardForum from "@/components/CardForum.vue"
const forumStore = useForumStore()
const userStore = useUserStore()
// onMounted(userStore.authen)
onMounted(forumStore.fetchPost)
onMounted(forumStore.fetchTag)
onMounted(forumStore.fetchSinglePost)





</script>

<template>
  <v-main>
    {{ userStore.loging }}
    <!-- <v-btn @click="forumStore.fetchSinglePost">test</v-btn> -->
    <!-- {{ forumStore.allTag }}<br/>
    {{ forumStore.selectTag }}<br/>
    {{ forumStore.singlePost }} -->
    <!-- {{ formattedDate }} -->
    <!-- {{ forumStore.post[0].post_created_at }} -->
    <v-container>
      <!-- <v-btn @click="forumStore.kuy()">test</v-btn> -->
      <v-select  variant="outlined" class=" d-flex flex-row-reverse" item-title="tag_name" item-value="tag_id" v-model="forumStore.selectTag" chips label="Tag"
        :items="forumStore.allTag" return-object></v-select>
      <CardForum  v-for="forum in forumStore.filterForum" :forum="forum" :to="{ name: 'forum', params: { id: parseInt(forum.post_id) }}" />
    </v-container>
    
    
  </v-main>
</template>

<style scoped>
</style>
