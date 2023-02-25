<script setup>
 import { useForumStore } from '../stores/forum';
 const {forum, allForum, addForum} = useForumStore()
 
</script>
<template>

  <v-card :to="`/forum/${index}`"  v-for="forum, index in allForum" class="pa-2 my-4" >
    <v-card-title primary-title >
      <div>
        <v-row class="my-1">
          <v-col>
            <h3>
         {{ forum.title }}
        </h3>
        </v-col>
      <v-col cols="1">
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
        
        
        <div class="text-truncate"
        style="max-width: 100%">{{ forum.desc }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title class="text-h6 my-1">{{forum.user.userName}}</v-list-item-title>

        

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
</template>