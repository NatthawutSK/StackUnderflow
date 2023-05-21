<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import { ref, onMounted } from "vue";
// const { logingUser } = useUserStore();
const route = useRoute()
const {id} = route.params
const forumStore = useForumStore();
const userStore = useUserStore()




defineProps({
  reply: Array,
  commId: Number
});
</script>

<template>
  <div v-for="item in reply">
    <h1 v-if="commId == item.comm_id">test reply : {{ item.reply_content }}  {{ commId }} </h1>
  </div>
</template>
<style>


</style>