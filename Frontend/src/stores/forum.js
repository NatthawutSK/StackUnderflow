import { defineStore } from "pinia";
import { computed, ref, reactive, watch } from "vue";
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'
export const useForumStore = defineStore('forum', () => {
    const route = useRouter()
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
    const commentPost = ref([])
   
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
        const fetchingData = await axios.get('/tag')
        allTag.value = [{tag_id:1, tag_name:"All"}, ...fetchingData.data];
        createTag.value = fetchingData.data;
        editTag.value = fetchingData.data;
      }



    const fetchPost = async () => {
        const fetchingData = await axios.get('', {
            params: {
                page: currentPage.value,
                pageSize: pageSize.value,
                tag:selectTag.value.tag_name
            }
          })
        post.value = fetchingData.data.post;
        totalPages.value = fetchingData.data.cnt      
    }


    watch(selectTag, (newValue, oldValue) => {
        fetchPost()
        return post.value
    });
    

    const editForum = async (forum, id) =>{
        const fetchdata = await axios.put(`/post/edit/${id}`, forum)
        singlePost.value = fetchdata.data
    }


    const addForum = async (forum,invalid) =>{
        console.log(forum,invalid);
        if(!invalid){
        await axios.post('/post/create', forum)
        Swal.fire({
            icon: 'success',
            title: 'Create Success'
        })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Please fill out'
            })
        }
        
    }

    const fetchSinglePost = async (id) => {
        return (await axios.get(`/post/${id}`)).data[0]
       }
    // const addLikePost = async (id) =>{
    //     const likeData = await axios.put(`/post/addlike/${id}`)
    //     singlePost.value.post_like = likeData.data.likeNum
    // }

    const deleteForum = async (id) =>{
        const fetchData = await axios.delete(`/post/delete/${id}`)
        alert(fetchData.data.message)
        route.push('/')
        // console.log(fetchData.data.message);
    }

    const fetchComment = async (id) => {
        return (await axios.get(`/comment/${id}`)).data
       }

    // const addLikeComment = async (comId) =>{
    //     const likeData = await axios.put(`/comment/addlike/${comId}`)
    //     commentPost.value = commentPost.value.map((item) => {
    //         if(item.comm_id == comId){
    //             return { ...item,  comm_like:likeData.data.likeNum };
    //         }
    //         return item
    //     })
    // }
    const editComment = async (id, comment) =>{
        console.log(typeof comment);
        await axios.put(`/comment/edit/${id}`, {comm_content:comment})
    }
    const createComment = ref({
        comm_content: "",
        post_id: "", 
        mem_id:""
    })
    
    const addComment = async (content, mem_id, post_id) =>{
        const commentData = await axios.post('/comment/create', {
            comm_content: content,
            post_id: post_id,
            mem_id: mem_id
        })

        commentPost.value.push(commentData.data[0])
        createComment.value.comm_content = "<p></p>"
    }
    const delComment = async(comm_id, post_id) =>{
        const fetchData = await axios.delete(`/comment/delete/${comm_id}`)
        alert(fetchData.data.message)
        commentPost.value = await fetchComment(post_id)
    }




    // pagination
    const totalPages = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(3);
    const prevPage = () => {
        // console.log("prev");
        if (currentPage.value > 1) {
          currentPage.value--;
          fetchPost();
        }
      };
      
      const nextPage = () => {
        // console.log("next");
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
          fetchPost();
        }
      };

      

    return {
        fetchPost,
        fetchSinglePost,
        post,
        selectTag,
        addForum,
        fetchTag,
        allTag,
        createTag,
        singlePost,
        convertTime,
        editForum,
        editTag,
        // addLikePost,
        deleteForum,
        commentPost,
        fetchComment,
        // addLikeComment,
        createComment,
        addComment,
        editComment,
        delComment,
        prevPage,
        nextPage,
        totalPages,
        currentPage,
        pageSize
    }
})