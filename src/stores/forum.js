import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
    const allReport = useLocalStorage('report', [])
    const tag = useLocalStorage('tag', '')
    const idPost = useLocalStorage('idPost', 0)
    function addComment(comment){
            allForum.value[comment.index].comment.push(comment)
    }
    
    const fcomment = (id) => {
        return computed(() =>{
            return allForum.value[id].comment || []
    }).value}

    function addForum(forum){
        allForum.value.push(forum)
        idPost.value++;
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
    function delReport(post, index){
        allReport.value.splice(index,1)
        allForum.value.splice(post,1)
    }

    function editForum(title, desc, post){
        allForum.value[post].desc = desc;
        allForum.value[post].title = title;
        // console.log(post);
    }
    const filterForum = computed(() => {
        if (tag.value === '') {
            return allForum.value
        } else {
            return allForum.value.filter(item => {
                return item.tag === tag.value
            })
        }
    })
    
    return {allForum, addForum, addComment, fcomment, deleteForum, deleteComment,addReport, delReport, allReport,editForum, tag, filterForum, idPost}
})