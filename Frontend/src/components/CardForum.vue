<script setup>
 defineProps({
  forum:Object
 })
  async function like(id){
    forum.post_like = await axios.put(`http://localhost:3000/post/addlike/${id}`)
  }
</script>
<template>

  <v-card class="pa-2 my-4" variant="outlined" style="z-index:1" >
    <v-card-title primary-title >
      <div>
        <v-row class="my-1">
          <v-col cols="11" style="white-space: normal">
            <h3>
         {{ forum.post_title }}
        </h3>
        </v-col>
          </v-row>
        <div class="text-truncate"
        style="max-width: 100%">{{ forum.post_desc }}</div>
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
        <v-list-item-title class="text-h6 my-1">user test</v-list-item-title>
        <v-chip>{{ forum.tag_id }}</v-chip>
        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn @click="like(forum.post_id)" style="z-index: 0;"><v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">{{forum.post_like}}</span></v-btn>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>