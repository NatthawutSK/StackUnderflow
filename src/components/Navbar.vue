<script setup>
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";
const {theme, user} = storeToRefs(useUserStore())
const {toggleTheme, login, logout} = useUserStore()


</script>

<template>
    <v-app-bar>
        <v-btn href="/">
          <v-app-bar-title>StackUnderflow</v-app-bar-title>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn  href="/profile">Profile</v-btn>
        <v-btn  href="/forum">Forum</v-btn>
        <v-btn  href="/login">Login</v-btn>
        <v-btn  href="/addforum">ADdForum</v-btn>
        <v-btn :icon="theme === 'light' ?
         'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme()"
        />
        <v-btn v-if="!user" @click="login(2)" icon="mdi-login" />
        <v-btn v-if="user" @click="logout()" icon="mdi-logout" />
        <v-btn >
          <v-avatar>
            <v-img :src="user  ? user.avatar: 'https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png'"/>
          </v-avatar>
        </v-btn>
      </v-app-bar>
</template>

<style scoped></style>


