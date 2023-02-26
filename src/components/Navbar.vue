<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const {theme} = storeToRefs(useUserStore())
const {toggleTheme, logout, logingUser} = useUserStore()

</script>

<template>
    <v-app-bar>
        <v-btn href="/">
          <v-app-bar-title>StackUnderflow</v-app-bar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <h3 v-if="JSON.stringify(logingUser) !== '{}'" class="pr-5">Welcome User : {{ logingUser.userName }}</h3>
        <!-- <v-btn  href="/profile">Profile</v-btn> -->
        <!-- <v-btn  href="/forum">Forum</v-btn> -->
        <v-btn  href="/addforum">Create Forum</v-btn>

        <v-btn :icon="theme === 'light' ?
         'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme()"
        />

        <!-- <v-btn  href="/login">Login</v-btn> -->
        <v-btn v-if="JSON.stringify(logingUser) === '{}'" variant="tonal"  href="/login"  >log in</v-btn>
        <v-btn v-else  @click="logout()" variant="tonal"  >log out</v-btn>
        <v-btn href="/profile">
          <v-avatar >
            <v-img  src="https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"/>

          </v-avatar>
        </v-btn>
      </v-app-bar>
</template>

<style scoped></style>

