import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";


export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
    function addComment(comment){
            allForum.value[comment.index].comment.push(comment)
    }
    
    const fcomment = (id) => {
        return computed(() =>{
            return allForum.value[id].comment
    }).value}
    function addForum(forum){
        allForum.value.push(forum)
    }
    function deleteForum(index){
        allForum.value.splice(index,1)
    }
    return {allForum, addForum, addComment, fcomment, deleteForum}
})