import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from 'axios';
export const useForumStore = defineStore('forum', () => {
    const post = ref([])
    const selectTag = ref({
                tag_id : 1,
                tag_name : "All"
            })
    const allTag = ref([])
    const createTag = ref([])
    
    function convertTime(time){
        const dateObj = new Date(time);

        const options = { 
            month: 'short', 
            day: '2-digit', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        };
        return dateObj.toLocaleString('en-US', options);
    }

    const fetchTag = async () => {
        const fetchingData = await axios.get('http://localhost:3000/tag')
        allTag.value = [{tag_id:1, tag_name:"All"}, ...fetchingData.data];
        createTag.value = fetchingData.data;
      }
    const fetchPost = async () => {
        const fetchingData = await axios.get('http://localhost:3000')
        post.value = fetchingData.data;
      }
      
    const filterForum = computed(() => {
        if (selectTag.value.tag_name == 'All') {
            return post.value
        } else {
            return post.value.filter(item => {
                return item.tag_name == selectTag.value.tag_name
            })
        }
    })



    const addForum = async (forum) =>{
        // console.log(forum);
        await axios.post('http://localhost:3000/post/create', forum)
    }

    return {
        fetchPost,
        post,
        filterForum,
        selectTag,
        addForum,
        fetchTag,
        allTag,
        createTag,
        convertTime
    
    }
})