import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
    const allComment = useLocalStorage('allComment', [])
    // const forum = ref({
    //     title:'',
    //     desc:'',
    //     tag:'',
    //     user:{},
    //     comment:[],
    // })
    function addComment(comment){
            allForum.value[comment.index].comment.push(comment)
    }
    const fcomment = (id) => {return computed(() =>{
            return allForum.value[id].comment
    }).value}
    function addForum(forum){
        allForum.value.push(forum)
    }
    return {allForum, addForum, addComment, allComment, fcomment}

})