
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from 'axios';
export const useForumStore = defineStore('forum', () => {
    const post = ref([])
    const selectTag = ref({
                tag_id : 0,
                tag_name : "All"
            })
    const allTag = ref([])
    const skudTag = ref([])
    function kuy(){
        allTag.value.map((item)=>{
            return skudTag.value.push(item.tag_name)
        })
    }
    

    // const createTag = ref([
    //     {
    //         tag_id : 1,
    //         tag_name : ""
    //     }
        
    // ])

    const fetchTag = async () => {
        const fetchingData = await axios.get('http://localhost:3000/tag')
        // console.log(fetchingData.data);
        allTag.value = fetchingData.data;
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
        await axios.post('http://localhost:3000/create', forum)
    }

    return {
        fetchPost,
        post,
        filterForum,
        selectTag,
        addForum,
        fetchTag,
        allTag,
        kuy,
        skudTag
    
    }
})