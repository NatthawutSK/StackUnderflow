import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";


export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
    const allReport = useLocalStorage('report', [])
    // const idReport = useLocalStorage('idreport', 0)
    function addComment(comment){
            allForum.value[comment.index].comment.push(comment)
    }
    
    const fcomment = (id) => {
        return computed(() =>{
            return allForum.value[id].comment || []
    }).value}

    function addForum(forum){
        allForum.value.push(forum)
    }
    function deleteForum(index){
        allForum.value.splice(index,1)
    }
    function deleteComment(comment, id){
        allForum.value[id].comment.splice(allForum.value[id].comment.findIndex((com) =>{
           return com.user === comment.user && com.desc === comment.desc
        }),1)
    }
    function addReport(report,id){
        allReport.value.push({report : report, post: id})
    }
    // const reportComp =  computed(() =>{
    //     return allReport.value
    // })
    function delReport(index){
        // console.log(index);
        allReport.value.splice(index,1)
        
    }
    return {allForum, addForum, addComment, fcomment, deleteForum, deleteComment,addReport, delReport, allReport}
})