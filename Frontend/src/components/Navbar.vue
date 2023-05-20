<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const {theme} = storeToRefs(useUserStore())
const userStore = useUserStore()


</script>

<template>
    <v-app-bar>
        <v-btn href="/">
          <v-app-bar-title ><v-icon size="x-large" style="transform: rotate(180deg);" icon="mdi-stack-overflow"></v-icon>Stack<b>Underflow</b></v-app-bar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <h3 v-if="JSON.stringify(userStore.user) !== '{}'" class="pr-5">Welcome User : {{userStore.user.mem_user_name}}</h3>

        
        <v-btn  v-if="JSON.stringify(userStore.user) !== '{}' && userStore.user?.role !== 'admin'"  href="/addforum">Create Forum</v-btn>
        <v-btn v-if="userStore.user?.role === 'admin' " href="/admin">Manage User</v-btn>
        
        

        <v-btn :icon="theme === 'light' ?
         'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="userStore.toggleTheme()"
        />

        <v-btn v-if="JSON.stringify(userStore.user) === '{}'" variant="tonal"  href="/login"  >log in / sign up</v-btn>
        <v-btn class="mx-3" v-else href='/'  @click="userStore.logout()" variant="tonal"  >log out</v-btn>
        <router-link class="mx-7" :to="{path:`/profile/${userStore.user.mem_id}`}">
          <v-avatar >
            <v-img cover  :src=" userStore.user?.mem_pic != null  ? 'http://localhost:3000/' + userStore.user?.mem_pic : 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'"/>
          </v-avatar>
        </router-link>
      </v-app-bar>
</template>

<style scoped></style>

