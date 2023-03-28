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
    const singlePost = ref({})
    const editTag = ref([{
        tag_id: singlePost.value.tag_id,
        tag_name: singlePost.value.tag_name
    }])
    
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
        editTag.value = fetchingData.data;
      }
    const fetchPost = async () => {
        const fetchingData = await axios.get('http://localhost:3000')
        post.value = fetchingData.data;
      }
      async function fetchSinglePostData(id){
        singlePost.value = await fetchSinglePost(id)
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

    const editForum = async (forum, id) =>{
        // console.log(forum, id);
        await axios.put(`http://localhost:3000/post/edit/${id}`, forum)
        fetchSinglePostData(id)
    }


    const addForum = async (forum) =>{
        await axios.post('http://localhost:3000/post/create', forum)
    }

    const fetchSinglePost = async (id) => {
        return (await axios.get(`http://localhost:3000/post/${id}`)).data[0]
       }
    const addLikePost = async (id) =>{
        await axios.put(`http://localhost:3000/post/addlike/${id}`)
        fetchSinglePostData(id)
    }

    const deleteForum = async (id) =>{
        await axios.delete(`http://localhost:3000/post/delete/${id}`)
    }
    


    return {
        fetchPost,
        fetchSinglePost,
        post,
        filterForum,
        selectTag,
        addForum,
        fetchTag,
        allTag,
        createTag,
        singlePost,
        convertTime,
        editForum,
        editTag,
        addLikePost,
        deleteForum
    
    }
})