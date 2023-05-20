import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import Swal from 'sweetalert2'
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {

    const reply = ref([])






    const fetchReply = async () =>{
        const fetchingData = await axios.get('/reply')
        reply.value = fetchingData
    }


    return {
        fetchReply,
        reply
    }
})