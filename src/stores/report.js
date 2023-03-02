import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { useForumStore } from "./forum";


export const useReportStore = defineStore('report', ()=>{
    const allReport = useLocalStorage('report', [])
    const forumStore = useForumStore()
    function addReport(report,id){
        allReport.value.push({report : report, post: id})
    }
    function delReport(post, index){
        allReport.value.splice(index,1)
        forumStore.allForum.splice(post,1)
    }
    return {allReport, addReport, delReport }
})