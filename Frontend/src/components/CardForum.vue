<script setup>
import {useForumStore} from "@/stores/forum"
const forumStore = useForumStore()
 defineProps({
  forum:Object
 })
  //:image=" forumStore.singlePost?.mem_pic != null  ? 'http://localhost:3000/' + forumStore.singlePost?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
</script>
<template>
  <!-- {{ forum }} -->
  <v-card class="pa-2 my-4" variant="outlined"  style="z-index:1" >
    <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'forum', params: { id: parseInt(forum.post_id) }}">
    <v-card-title primary-title>
      <div>
        <v-row class="my-1">
          <v-col cols="11" style="white-space: normal">
            <h3>
         {{ forum.post_title }}
        </h3>
        </v-col>
          </v-row>
        <!-- <div class="text-truncate"
        style="max-width: 100%">{{ forum.post_desc }}</div> -->
        <small>{{ forumStore.convertTime(forum.post_created_at) }}</small>
      </div>
    </v-card-title></router-link>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <router-link :to="{path:`/profile/${forum.mem_id}`}" class="text-decoration-none">
          <v-avatar
            color="grey-darken-3"
            class="mr-5"
            :image=" forum?.mem_pic != null  ? 'http://localhost:3000/' + forum?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'">
          ></v-avatar>
          </router-link>
        </template>
        <router-link :to="{path:`/profile/${forum.mem_id}`}" class="text-decoration-none">
          <v-list-item-title class="text-h6 my-1">{{forum.mem_user_name}}</v-list-item-title>
        </router-link>
        <v-chip>{{ forum.tag_name }}</v-chip>
        <template v-slot:append>
          <div class="justify-self-end">
            <!-- <v-btn  style="z-index: 0;"><v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">{{forum.post_like}}</span></v-btn> -->
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>