<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useForumStore } from "@/stores/forum";
import { useVuelidate } from '@vuelidate/core'
import { required,minLength,helpers,maxLength } from '@vuelidate/validators'
const forumStore = useForumStore();
const userStore = useUserStore();
onMounted(forumStore.fetchTag);
const forum = ref({ 
    post_title: "",
    post_desc: "<p><br></p>",
    mem_id: userStore.user.mem_id,
    tag_id: { tag_id: 0, tag_name: "Select Tag" },
});
const description = (value) => {
  if (value == '<p><br></p>') {
    return false
  }
  return true;
}
const customValidation2 = (value) => {
  if (typeof value === 'object') {
    return false
  }
  return true;
}
const rule = {
    post_title:{
        required,
        minLength:minLength(20)
    },
    post_desc:{
        description:helpers.withMessage('This field cannot be empty', description),
        minLength:minLength(20)
    },
    tag_id:{
        required,
        customValidation2:helpers.withMessage('Select Tag !!!', customValidation2),
    }
}
const v$ = useVuelidate(rule,forum)
// post_title, post_desc, mem_id, tag_id
</script>
<template>
    <v-main>
        <v-form>
            <v-card>
                {{ userStore.user }}
                <v-card-title class="text-h4 ma-3 mb-5 px-5">
                    Create Forum
                </v-card-title>

                
                    <v-text-field
                        variant="outlined"
                        class="mx-2 mb-5 pl-6"
                        prepend-icon="mdi-account-circle"
                        label="Title"
                        v-model="forum.post_title"
                        :error-messages="v$?.post_title?.$errors.map(e => e.$message)"
                        @input="v$?.post_title?.$touch"
                    ></v-text-field>
                
                <!-- <v-textarea
          variant="outlined"
            class="mx-2"
            label="Description"
            v-model="forum.post_desc"
            rows="4"
            prepend-icon="mdi-comment"
          ></v-textarea> -->
                <v-card-item prepend-icon="mdi-comment" class="p-0 mb-5">
                    <h2 class="mb-3">Write your detail here</h2>
                    <p><br></p>
                    <QuillEditor
                        content-type="html"
                        v-model:content="forum.post_desc"
                        @input="v$?.post_desc?.$touch"
                        :toolbar="[
                            { size: ['small', false, 'large', 'huge'] },
                            'bold',
                            'italic',
                            'underline',
                            'code-block',
                            { color: [] },
                            { background: [] },
                        ]"
                        theme="snow"
                    />
                    <v-alert v-if="v$.post_desc.$errors.length > 0" :text="v$?.post_desc?.$errors.map(e => e.$message)[0]" type="error"></v-alert>
                </v-card-item>
                <v-card-item>
                    <v-select
                        variant="outlined"
                        chips
                        prepend-icon="mdi-tag"
                        class="mx-2 mt-5"
                        label="Select Tag"
                        item-title="tag_name"
                        item-value="tag_id"
                        :items="forumStore.createTag"
                        v-model="forum.tag_id"
                        :error-messages="v$?.tag_id?.$errors.map(e => e.$message)"
                        @input="v$?.tag_id?.$touch"
                        aria-required="true"
                    ></v-select>
                </v-card-item>
                <!-- {{ forumStore.allTag }} -->
                {{v$.$invalid}}
                {{ forum.post_title }}<br />
                {{ forum.post_desc }}<br />
                {{ forum.mem_id }}<br />
                {{ forum.tag_id }}
                <div></div>
                <!-- :href="v$.$invalid? '#':'/'" -->
                <div class="d-flex justify-center">
                    <v-btn
                        :href="v$.$invalid? '#':'/'"
                        class="mb-5 w-50"
                        color="warning"
                        @click="v$.$touch(),forum.mem_id = userStore.user.mem_id,forumStore.addForum(forum,v$.$invalid)"
                      
                        >Create Post</v-btn
                    >
                </div>
            </v-card>
        </v-form>
    </v-main>
</template>