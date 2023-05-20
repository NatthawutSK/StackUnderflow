<script setup>
import { onMounted, ref } from "vue";
import { useForumStore } from "@/stores/forum";
import { useUserStore } from "@/stores/user";
import CardForum from "@/components/CardForum.vue"
const forumStore = useForumStore()
const userStore = useUserStore()
const step = ref(1)
// onMounted(userStore.authen)
onMounted(forumStore.fetchPost)
onMounted(forumStore.fetchTag)
onMounted(forumStore.fetchSinglePost)
onMounted(forumStore.fetchPostFollowing)

</script>

<template>
  <v-main>
    {{ userStore.loging }}

    <!-- {{ (userStore.user2).mem_id }}
    {{ userStore.user2.mem_id }} -->

    {{ Math.ceil(forumStore.totalPages/forumStore.pageSize) }}

    <!-- <v-btn @click="forumStore.fetchSinglePost">test</v-btn> -->
    <!-- {{ forumStore.allTag }}<br/>
    {{ forumStore.selectTag }}<br/>
    {{ forumStore.singlePost }} -->
    <!-- {{ formattedDate }} -->
    <!-- {{ forumStore.post[0].post_created_at }} -->
    <v-container>
      <v-btn  @click="step=1">All Post</v-btn>      <v-btn @click="step=2">Following</v-btn>

      <v-window v-model="step">
        <v-window-item :value="1">
            <v-select  variant="outlined" class=" d-flex flex-row-reverse mt-5" item-title="tag_name" item-value="tag_id" v-model="forumStore.selectTag" chips label="Tag"
              :items="forumStore.allTag" return-object></v-select>
      <CardForum  v-for="forum in forumStore.post" :forum="forum"  />
      <div>
        <div>
          <v-btn @click="forumStore.prevPage()" :disabled="forumStore.currentPage === 1">Prev </v-btn>
          <v-btn @click="forumStore.nextPage()" :disabled="forumStore.currentPage === Math.ceil(forumStore.totalPages/forumStore.pageSize) || Math.ceil(forumStore.totalPages/forumStore.pageSize) === 0 ">Next</v-btn>
        </div>
      </div>
            </v-window-item>
            <v-window-item :value="2">
              <div class="ma-5">
              <h1 v-if="forumStore.postfollowing.length===0">You did not follow anyone</h1>
              <h1 v-else>Following</h1>
            </div>
              <CardForum  v-for="forum in forumStore.postfollowing" :forum="forum"  />
              <div>
                <div>
                  <v-btn @click="forumStore.prevPage2()" :disabled="forumStore.currentPage2 === 1">Prev </v-btn>
                  <v-btn @click="forumStore.nextPage2()" :disabled="forumStore.currentPage2 === Math.ceil(forumStore.totalPages2/forumStore.pageSize2) || Math.ceil(forumStore.totalPages2/forumStore.pageSize2) === 0 ">Next</v-btn>
                </div>
              </div>
            </v-window-item>
            </v-window>
    </v-container>

    

  </v-main>
</template>

<style scoped></style>
