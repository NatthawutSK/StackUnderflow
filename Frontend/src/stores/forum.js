
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from 'axios';
export const useForumStore = defineStore('forum', () => {
    const post = ref([])

    const fetchPost = async () => {
        const fetchingData = await axios.get('http://localhost:3000')
        post.value = fetchingData.data;
      }


    // const allForum = useLocalStorage('allForum', [])
    // const tag = useLocalStorage('tag', 'All')
    // const idPost = useLocalStorage('idPost', 0)
    // function addComment(comment) {
    //     allForum.value[comment.index].comment.push(comment)
    // }

    // const fcomment = (id) => {
    //     return computed(() => {
    //         return allForum.value[id].comment || []
    //     }).value
    // }

    // function addForum(forum) {
    //     allForum.value.push(forum)
    //     idPost.value++;
    // }
    // function deleteForum(index) {
    //     allForum.value.splice(index, 1)
    // }
    // function deleteComment(comment, id) {
    //     allForum.value[id].comment.splice(allForum.value[id].comment.findIndex((com) => {
    //         return com.user === comment.user && com.desc === comment.desc
    //     }), 1)
    // }

    // function editForum(title, desc, post) {
    //     allForum.value[post].desc = desc;
    //     allForum.value[post].title = title;
    // }
    // const filterForum = computed(() => {
    //     if (post.value === 'All') {
    //         return allForum.value
    //     } else {
    //         return post.value.filter(item => {
    //             return item.post === post.value
    //         })
    //     }
    // })

    return {
        fetchPost,
        post,
        // filterForum
    
    }
})