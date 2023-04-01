<script setup>
import { ref, onMounted } from "vue";
// import { useUserStore } from "@/stores/user";
import { useForumStore } from "@/stores/forum";
// const {  logingUser } = useUserStore();
const forumStore = useForumStore();
onMounted(forumStore.fetchTag);
const forum = ref({
    post_title: "",
    post_desc: "",
    mem_id: 1,
    tag_id: { tag_id: 0, tag_name: "Select Tag" },
});
// post_title, post_desc, mem_id, tag_id
</script>
<template>
    <v-main>
        <v-form>
            <v-card>
                <v-card-title class="text-h4 ma-3 mb-5 px-5">
                    Create Forum
                </v-card-title>

                
                    <v-text-field
                        variant="outlined"
                        class="mx-2 mb-5 pl-6"
                        prepend-icon="mdi-account-circle"
                        label="Title"
                        v-model="forum.post_title"
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
                    <QuillEditor
                        content-type="html"
                        v-model:content="forum.post_desc"
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
                        aria-required="true"
                    ></v-select>
                </v-card-item>
                <!-- {{ forumStore.allTag }} -->

                {{ forum.post_title }}<br />
                {{ forum.post_desc }}<br />
                {{ forum.mem_id }}<br />
                {{ forum.tag_id }}
                <div></div>
                <div class="d-flex justify-center">
                    <v-btn
                        href="/"
                        class="mb-5 w-50"
                        color="warning"
                        @click="forumStore.addForum(forum)"
                        >Create Post</v-btn
                    >
                </div>
            </v-card>
        </v-form>
    </v-main>
</template>
