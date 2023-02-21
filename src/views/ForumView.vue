<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Comment from "../components/Comment.vue"

const {user} = storeToRefs(useUserStore())

</script>

<template>
  <v-main>
    <v-container>
        <v-main >
          <v-card>
            <v-card-title primary-title>
              <v-row >
                <v-col>
              <div>
                <h3 class="headline pa-6 text-h3">headline</h3>
              </div>
            </v-col>
            <v-col cols="1" >
              <v-menu location="end">
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
          
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="text-h6 pa-1">Delete</v-list-item-title>
                    <v-list-item-title class="text-h6 pa-1">Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <div class="text-h5 pa-5">
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur numquam saepe maiores eos, recusandae labore eaque quasi inventore nihil animi nobis corrupti voluptates quisquam autem quo, excepturi aperiam perferendis assumenda consequuntur adipisci tempore nostrum architecto dolore! Deserunt et odit repellat, officiis sed natus cumque qui magnam corporis, doloribus itaque! Quasi ipsum eaque est sunt quia sit exercitationem veniam porro explicabo cum! Culpa saepe blanditiis laboriosam. Error atque impedit, non magni ab voluptas aliquid explicabo repellendus tempora delectus similique eum maxime neque cum ad ullam blanditiis doloremque dolorem perspiciatis voluptate cupiditate. Dolore recusandae nemo voluptate, dignissimos vero corrupti maxime perferendis enim.
              </p>
            </div>
            </v-card-text>
            <v-card-actions>
              <v-list-item class="w-100 pa-4">
                <template v-slot:prepend>
                  <v-avatar
                    color="grey-darken-3"
                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-avatar>
                </template>
        
                <v-list-item-title class="text-h6 my-1">Evan You</v-list-item-title>
        
                <v-list-item-subtitle class="text-h6">Vue Creator</v-list-item-subtitle>
        
                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-btn><v-icon class="me-1" icon="mdi-heart"></v-icon>
                      <span class="subheading me-2">256</span></v-btn>
                    <span class="me-1">·</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
      </v-main>
     
      <v-main>
       <h1>Comments</h1>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </v-main>
    </v-container>
  </v-main>
</template>

<style></style>