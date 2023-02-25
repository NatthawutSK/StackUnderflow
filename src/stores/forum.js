import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

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
    function addComment(com){
        allComment.value.push(com)
    }
    function addForum(forum){
        allForum.value.push(forum)
    }
    // function addComment(comment){
    //     allForum.value[comment.index].comment.push(comment)
    //     // console.log(allForum.value[comment.index])
    //     // console.log(comment.comment[0].desc);
    //     // allForum.value.push(comment)
    //     // console.log(comment);
    //     // location.reload();
    // }
    return {allForum, addForum, addComment, allComment}
})