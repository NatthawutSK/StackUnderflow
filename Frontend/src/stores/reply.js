import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import Swal from 'sweetalert2'
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";

export const useReplyStore = defineStore('reply', () => {

    const reply = ref([])

    const createReply = ref({
      reply_content: "",
  })


  const addReply = async(content, post_id, mem_id, comm_id) => {
    // console.log(content, post_id, mem_id, comm_id);
    const fetchingData = await axios.post('/create/reply', {
      reply_content: content,
      mem_id: mem_id,
      post_id: post_id,
      comm_id: comm_id
    })
    if(fetchingData.data.status === 'error'){
      const sweet = await Swal.fire({
        icon: "error",
        title: fetchingData.data.message,
        confirmButtonText: 'Close'
      })
    }
    reply.value.push(fetchingData.data)
    createReply.value.reply_content = "<p></p>"
    console.log(fetchingData.data);
    }
  


    const fetchReply = async (post_id) =>{
        const fetchingData = await axios.get('/reply', {
            params: {
              post_id: post_id,
            }
          })
          console.log(fetchingData.data);
        return  fetchingData.data
    }


    return {
        fetchReply,
        reply,
        createReply,
        addReply
    }
})