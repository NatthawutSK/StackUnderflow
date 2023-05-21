<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import { useReplyStore } from "../stores/reply";
import { ref, onMounted,computed } from "vue";
const replyStore = useReplyStore();
// const { logingUser } = useUserStore();
const route = useRoute()
const {id} = route.params
const forumStore = useForumStore();
const userStore = useUserStore()

const prop = defineProps({
  commId: Number
});
// const {reply, commId} = prop
// const filterreply = computed(()=>{
//   return reply.filter((val)=>{return val.comm_id === commId})
// })
const reply = ref([])
const showReply = ref(false)
onMounted(async()=>{
  const { commId} = prop
  reply.value = await replyStore.fetchReply(id,commId)
})
const pushReply = async () => {
      const replyContent = replyStore.createReply.reply_content;
      const userId = userStore.user.mem_id;
      const { commId} = prop

      try {
        const newReply = await replyStore.addReply(replyContent, id, userId, commId);
        reply.value.push(newReply);
      } catch (error) {
        console.error(error);
      }
    };
</script>

<template>
  <v-btn @click="showReply = !showReply">{{ showReply ? "Close Reply" : "Reply" }}</v-btn>
  <div v-if="showReply">
    <v-card-title>Write Reply </v-card-title>
    <v-card-text class="mr-10 ">

      <QuillEditor content-type="html" v-model:content="replyStore.createReply.reply_content" :toolbar="[
        { header: [1, 2, false] },
        'bold',
        'italic',
        'underline',
        'code-block',
        { color: [] },
        { background: [] },
      ]" theme="snow" />
    </v-card-text>
    <div class="d-flex justify-end">
      <v-btn
        @click="pushReply"
        color="warning">reply</v-btn>
    </div>
    </div>
<v-expansion-panels v-if="reply?.length>0">
  <v-expansion-panel title="Reply" multiple>
    <v-expansion-panel-text class="pa-3">
    <p class="text-h5">All reply here</p>
  <v-list v-for="item in reply" class="pa-1 ma-1">
    <v-list-item>
      <template v-slot:prepend>
        <div class="d-flex justify-center flex-column">
        <router-link :to="{path:`/profile/${item.mem_id}`}" class="text-decoration-none">
        <v-avatar
        class="mr-3"
          color="grey-darken-3"
          :image=" item.mem_pic != null  ? 'http://localhost:3000/' + item?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
        ></v-avatar>
      
          <v-list-item-title class="text-h6 my-1">{{item.mem_user_name}}</v-list-item-title>
          </router-link>
          <small>{{forumStore.convertTime(item.reply_create_at)}}</small>
        </div>
      </template>
      <div v-html="item.reply_content" class="ms-5"></div>
    </v-list-item>
  </v-list>
</v-expansion-panel-text>
</v-expansion-panel>
</v-expansion-panels>
  
</template>
<style>


</style>