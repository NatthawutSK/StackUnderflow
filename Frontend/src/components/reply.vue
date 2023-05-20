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
  
});


</script>

<template>
  <h1>test reply</h1>
</template>
<style>


</style>