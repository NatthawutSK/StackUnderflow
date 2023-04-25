import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from '@/plugins/axios';

export const useUserStore = defineStore('user', () => {
    const theme = useLocalStorage('theme', 'light')
    const token = useLocalStorage('token', '')
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
        window.location = '/'
        // console.log(fetchingData.data);
    }


    const authen = async () =>{
            const fetchingData = await axios.post('/authen', {}, 
            { 
                headers: 
                    {"Authorization" : `Bearer ${token.value}`}
            })
            console.log(fetchingData);
            if(fetchingData.data.status == "ok"){
                alert("login success")
                loging.value = fetchingData.data.decoded.user
            }else{
                window.location = ('/login')
                alert("login fail")

            }
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
        guest
        
    }
})