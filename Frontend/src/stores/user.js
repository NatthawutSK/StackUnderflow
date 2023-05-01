import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import Swal from 'sweetalert2'
import { required,minLength,maxLength,sameAs,email,helpers } from '@vuelidate/validators'
import axios from '@/plugins/axios';
import { useRouter } from "vue-router";
// import { useVuelidate } from '@vuelidate/core';
// import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators';

export const useUserStore = defineStore('user', () => {
    const theme = useLocalStorage('theme', 'light')
    // const token = useLocalStorage('token', '')
    const user = useLocalStorage('user',{})
    const regisData = ref({
        fname : "",
        lname : "",
        username: "",
        email: "",
        password: "",
        cpassword:""
    })
    const loginData = ref({
        username: "",
        password: ""
    })
    const loging = ref({})
    const validationRule = {
        username:{
            required,
            minLength:minLength(5),
            maxLength:maxLength(15),
        },
        password:{
            required,
           minLength: minLength(8),
        }
    }
    const v$ = useVuelidate(validationRule,loginData)
    const complexPassword = (value) => {
        if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
          return false
        }
        return true
      }
    const validationRules = {
        fname:{
            required,
            minLength:minLength(5),
            maxLength:maxLength(15),
        },
        lname:{
            required,
            minLength:minLength(5),
            maxLength:maxLength(15),
        },
        username:{
            required,
            minLength:minLength(5),
            maxLength:maxLength(15),
        },
        email:{
            required,email
        },
        password:{
             required,
            minLength: minLength(8),
            complex:  helpers.withMessage('Your password too ez', complexPassword),
        },
        cpassword:{
            required,
            sameAs: helpers.withMessage('Your password not match', function (val) {
                return val == regisData.value.password 
            }),
            
        }
    }
    const v2$ = useVuelidate(validationRules, regisData)
    const route = useRouter()

    
    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    const register =  async (info) =>{
        
        if(!v2$.$invalid ){
        const fetchData = await axios.post('/register', info)
        const sweet = Swal.fire({
            icon: fetchData.data.status,
            title: fetchData.data.message,
            confirmButtonText: 'Close'
          })
        // console.log("kuy au");
        }
        
    }

    const login =  async (info) =>{
        // console.log(info);
        const fetchingData = await axios.post('/login', info)
        // token.value = fetchingData.data.token
        document.cookie = `token=${fetchingData.data.token}; max-age=21600; path=/;`;
        const sweet = await Swal.fire({
            icon: fetchingData.data.status,
            title: fetchingData.data.message,
            confirmButtonText: 'Close'
          })
        if(fetchingData.data.status == "success"){
            authen()
            route.push('/')
        }
    }


    const authen = async () =>{
            const fetchingData = await axios.get('/user/me' )
            user.value = fetchingData.data 
    }

    const logout = () => {
        user.value = {}
        document.cookie = "token=; max-age=-1; path=/;";
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
        user,
        v$,
        v2$
    }
})