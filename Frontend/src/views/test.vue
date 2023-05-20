<template>
  <v-main>
    <v-container>
      <div>
      <input type="file" accept="image/png, image/jpeg, image/webp" @change="previewImage">
      <div>
        <img v-if="imageURL" :src="imageURL" alt="Preview">
        <p v-else>No image selected.</p>
      </div>
    </div>
    </v-container>
  </v-main>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    setup() {
      const imageURL = ref(null);
      function previewImage(event) {
        const file = event.target.files[0];
  
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
  
          reader.onload = () => {
            imageURL.value = reader.result;
          };
  
          reader.readAsDataURL(file);
        } else {
          imageURL.value = null;
          alert('Invalid file. Please select an image.');
        }
      }
  
      watch(imageURL, (newValue) => {
        // Do something with the preview image URL
        console.log(newValue);
      });
  
      return {
        imageURL,
        previewImage
      };
    }
  };
  </script>
  