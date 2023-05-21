import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import Swal from 'sweetalert2'
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";

export const useReplyStore = defineStore('reply', () => {

    const reply = ref([])






    const fetchReply = async (post_id) =>{
        const fetchingData = await axios.get('/reply', {
            params: {
              post_id: post_id
            }
          })
          console.log(fetchingData.data);
        return  fetchingData.data
    }


    return {
        fetchReply,
        reply
    }
})