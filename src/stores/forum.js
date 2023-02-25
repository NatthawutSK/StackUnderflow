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

    return {forum, allForum, addForum}
})