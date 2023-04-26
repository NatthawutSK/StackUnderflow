import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const theme = useLocalStorage('theme', 'light')
    const token = useLocalStorage('token', '')
    const user = useLocalStorage('user',{})
    const regisData = ref({
        fname : "",
        lname : "",
        username: "",
        email: "",
        password: ""
    })
    const loginData = ref({
        username: "",
        password: ""
    })
    const loging = ref({})
    const guest = ref({
        username:'Guest',
        password:'guest'
    })
    const route = useRouter()

    
    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    const register =  async (info) =>{
        await axios.post('/register', info)
    }

    const login =  async (info) =>{
        // console.log(info);
        const fetchingData = await axios.post('/login', info)
        token.value = fetchingData.data.token
        if(fetchingData.data.status == "ok"){
            authen()
            route.push('/')
            
        }else{
            alert("login fail")

        }
        
        
        // console.log(fetchingData.data);
    }


    const authen = async () =>{
            const fetchingData = await axios.get('/user/me' )
            user.value = fetchingData.data.user
            // console.log(fetchingData.data);
           
            
    }

    const logout = () => {
        token.value = null
    }


    return {
        toggleTheme,
        theme,
        register,
        regisData,
        login,
        loginData,
        authen,
        logout,
        loging,
        guest,
        user
    }
})