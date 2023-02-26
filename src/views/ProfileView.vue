<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

import CardProfile from '../components/CardProfile.vue'
const {user} = storeToRefs(useUserStore())

</script>

<template>
  <v-main>
    <v-container >
        <CardProfile></CardProfile>
    </v-container>
  </v-main>
</template>

<style></style>