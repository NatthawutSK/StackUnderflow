import { defineStore } from "pinia";
import { computed, ref, reactive, watch } from "vue";
import axios from '@/plugins/axios';
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";
export const useForumStore = defineStore('forum', () => {
    const route = useRouter()
    const post = ref([])
    const postfollowing = ref([])
    const selectTag = ref({
        tag_id: 1,
        tag_name: "All"
    })
    const allTag = ref([])
    const createTag = ref([])
    const singlePost = ref({})
    const editTag = ref([{
        tag_id: singlePost.value.tag_id,
        tag_name: singlePost.value.tag_name
    }])
    const commentPost = ref([])

    function convertTime(time) {
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
        allTag.value = [{ tag_id: 1, tag_name: "All" }, ...fetchingData.data];
        createTag.value = fetchingData.data;
        editTag.value = fetchingData.data;
    }





    const fetchPostFollowing = async() => {
        const fetchingData = await axios.get('/postfollowing',
        {
            params: {
                page: currentPage2.value,
                pageSize: pageSize2.value,
            }
        })
        postfollowing.value = fetchingData.data.post;
        totalPages2.value = fetchingData.data.cnt
    }

    watch(selectTag, (newValue, oldValue) => {
        fetchPost()
        return post.value
    });


    const editForum = async (forum, id) => {
        const fetchdata = await axios.put(`/post/edit/${id}`, forum)
        singlePost.value = fetchdata.data
    }


    const addForum = async (forum, invalid) => {
        console.log(forum, invalid);
        if (!invalid) {
            await axios.post('/post/create', forum)
            Swal.fire({
                icon: 'success',
                title: 'Create Success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please fill out'
            })
        }

    }

    const fetchSinglePost = async (id) => {
        return (await axios.get(`/post/${id}`)).data[0]
    }


    const deleteForum = async (id) => {
        const fetchData = await axios.delete(`/post/delete/${id}`)
        alert(fetchData.data.message)
        route.push('/')
        // console.log(fetchData.data.message);
    }

    // const fetchComment = async (id) => {
    //     return (await axios.get(`/comment/${id}`)).data
    // }


    // fetch comment loadMore comment
    const totalcomment = ref(0);
    const currentComment = ref(1);
    const commentSize = ref(1);


    // const fetchMoreComment = async (id) => {
    //     // console.log(currentComment.value, commentSize.value);
    //     const fetchdata = await axios.get(`/comment/${id}`, {
    //         params: {
    //             startAt: currentComment.value,
    //             commSize: commentSize.value,
    //         }
    //     })
    //     totalcomment.value = fetchdata.data.cnt
    //     // console.log(fetchdata.data);
    //     return [fetchdata.data.moreComm, fetchdata.data.cnt]
    // }
    const fetchComment = async (id) => {
        const fetchdata = await axios.get(`/comment/${id}`)
        return fetchdata.data
        // return (await axios.get(`/comment/${id}`)).data
    }



    // const cntComment = async(id) => {
    //     const cntComment = await fetchMoreComment(id)


    // }
    const arrayCom = ref([])
    const cntLoad = ref(2)
    const loadMoreComment = async () => {
        cntLoad.value = cntLoad.value + 2
        arrayCom.value = commentPost.value.slice(0, cntLoad.value)
        console.log(cntLoad.value);
    }





    const editComment = async (id, comment) => {
        console.log(typeof comment);
        await axios.put(`/comment/edit/${id}`, { comm_content: comment })
    }
    const createComment = ref({
        comm_content: "",
        post_id: "",
        mem_id: ""
    })

    const addComment = async (content, mem_id, post_id) => {
        const commentData = await axios.post('/comment/create', {
            comm_content: content,
            post_id: post_id,
            mem_id: mem_id
        })
        const sweet = await Swal.fire({
            icon: commentData.data.status,
            title: commentData.data.message,
            confirmButtonText: 'Close'
        })
        if(commentData.data.status != 'error'){
        // console.log(commentData.data.newComm);
        commentPost.value.unshift(commentData.data.newComm)
        arrayCom.value.unshift(commentData.data.newComm)
        cntLoad.value++
        createComment.value.comm_content = "<p></p>"
        }
    }
    const delComment = async (comm_id, post_id) => {
        const fetchData = await axios.delete(`/comment/delete/${comm_id}`)
        // alert(fetchData.data.message)
        const sweet = await Swal.fire({
            icon: "success",
            title: fetchData.data.message,
            confirmButtonText: 'Close'
        })
        arrayCom.value = arrayCom.value.filter((item) => {
            return comm_id != item.comm_id
        })
        commentPost.value = commentPost.value.filter((item) => {
            return comm_id != item.comm_id
        })
    }


    const computeComm = computed(()=>{
        return commentPost.value.length
    })


    const fetchPost = async () => {
        const fetchingData = await axios.get('', {
            params: {
                page: currentPage.value,
                pageSize: pageSize.value,
                tag: selectTag.value.tag_name
            }
        })
        post.value = fetchingData.data.post;
        totalPages.value = fetchingData.data.cnt
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


    // pagination2
    const totalPages2 = ref(0);
    const currentPage2 = ref(1);
    const pageSize2 = ref(3);
    const prevPage2 = () => {
        // console.log("prev");
        if (currentPage2.value > 1) {
            currentPage2.value--;
            fetchPostFollowing();
        }
    };

    const nextPage2 = () => {
        // console.log("next");
        if (currentPage2.value < totalPages2.value) {
            currentPage2.value++;
            fetchPostFollowing();
        }
    };





    // voting post

    const postVoteUp = async (voter_id, post_id, gotVote_id) => {
        const fetchData = await axios.put('/post/vote/up', {
            voter_id: voter_id,
            post_id: post_id,
            gotVote_id: gotVote_id
        })
        if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
            })
        }
        else if (fetchData.data.status == "success") {
            singlePost.value.post_vote = fetchData.data.vote
        }
        console.log(fetchData.data);
    }

    const postVoteDown = async (voter_id, post_id, gotVote_id) => {
        const fetchData = await axios.put('/post/vote/down', {
            voter_id: voter_id,
            post_id: post_id,
            gotVote_id: gotVote_id
        })
        if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
            })
        }
        else if (fetchData.data.status == "success") {
            singlePost.value.post_vote = fetchData.data.vote
        }
        console.log(fetchData.data);
    }



    // voting Comment
    const commVoteUp = async (voter_id, comm_id, gotVote_id, index) => {
        const fetchData = await axios.put('/comm/vote/up', {
            voter_id: voter_id,
            comm_id: comm_id,
            gotVote_id: gotVote_id
        })
        if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
            })
        }
        else if (fetchData.data.status == "success") {
            commentPost.value[index].comm_vote = fetchData.data.vote
        }
        console.log(fetchData.data);
    }

    const commVoteDown = async (voter_id, comm_id, gotVote_id, index) => {
        const fetchData = await axios.put('/comm/vote/down', {
            voter_id: voter_id,
            comm_id: comm_id,
            gotVote_id: gotVote_id
        })
        if (fetchData.data.role == "guess" || fetchData.data.status == "error") {
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
            })
        }
        else if (fetchData.data.status == "success") {
            commentPost.value[index].comm_vote = fetchData.data.vote
        }
        console.log(fetchData.data);
    }

    //accept Answer Correct
    const acceptAnswer = async (post_id, answer_id,comm_id) => {
        // console.log(post_id, answer_id);
        const fetchData = await axios.put('/answer/accept', {
            post_id: post_id,
            answer_id: answer_id,
            comm_id:comm_id
        })
        if (fetchData.data.status == "success") {
            const sweet = await Swal.fire({
                icon: "success",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
              })
            commentPost.value = commentPost.value.map((val)=>{
                console.log(val);
                if(val.comm_id === comm_id){
                     val.accept = 1
            }
                return val
            })
            console.log(commentPost.value);
        }else{
            const sweet = await Swal.fire({
                icon: "error",
                title: fetchData.data.message,
                confirmButtonText: 'Close'
              })

        }


    }

    const thumb = ref("")
    const checkThumb = async (post_id, mem_id) =>{
        const fetchData = await axios.get('/thumb',{
            post_id: post_id,
            mem_id: mem_id
        })
        console.log(fetchData.data);
    }
    


    return {
        fetchPost,
        fetchPostFollowing,
        fetchSinglePost,
        post,
        postfollowing,
        selectTag,
        addForum,
        fetchTag,
        allTag,
        createTag,
        singlePost,
        convertTime,
        editForum,
        editTag,
        deleteForum,
        commentPost,
        fetchComment,
        createComment,
        addComment,
        editComment,
        delComment,
        prevPage,
        nextPage,
        totalPages,
        currentPage,
        pageSize,
        postVoteUp,
        postVoteDown,
        commVoteUp,
        commVoteDown,
        acceptAnswer,
        prevPage2,
        nextPage2,
        totalPages2,
        currentPage2,
        pageSize2,
        // fetchMoreComment,
        loadMoreComment,
        totalcomment,
        currentComment,
        commentSize,
        cntLoad,
        arrayCom,
        computeComm,
        thumb,
        checkThumb
    }
})
