import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
    const forum = ref({
        title:'',
        desc:'',
        tag:'',
        user:{},
        comment:[],
    })
    function addForum(forum){
        allForum.value.push(forum)
    }
    function addComment(comment){
        
        allForum.value[comment.index].comment.push({'desc':comment.desc, 'user':comment.user})
        console.log(allForum.value[comment.index])
    }
    return {forum, allForum, addForum, addComment}
})