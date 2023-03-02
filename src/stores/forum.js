import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed} from "vue";


export const useForumStore = defineStore('forum', ()=>{
    const allForum = useLocalStorage('allForum', [])
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

    function editForum(title, desc, post){
        allForum.value[post].desc = desc;
        allForum.value[post].title = title;
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
    
    return {allForum, addForum,addComment, deleteComment,fcomment, deleteForum,editForum, tag, filterForum, idPost}
})