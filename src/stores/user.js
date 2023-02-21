import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import { ref } from "vue";
export const useUserStore = defineStore('user', () =>{
    const theme = useLocalStorage('theme', 'light')
    const allUser = useLocalStorage('allUser', [])
    const user = ref({
        fname: '',
        lname: '',
        userName: '',
        email: '',
        password: ''
    })
    function toggleTheme(){
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    function login(id){
        console.log();
    }
    function keepLocal(info){
        console.log(info)
        allUser.value.push(info)
        
    }
    function checkUser(data){
       allUser.value.map((item) => {
           if(item.userName === data.userName && item.password === data.password){
                user.value = item;
                console.log("u are loging in")
           }
        })
        console.log(user.value)
    }
    // async function login(id){
    //     const res = await fetch(`https://www.melivecode.com/api/users/${id}`)
    //     const result = await res.json()
    //     console.log(result.user);
    //     user.value = result.user
    // }

    function logout(){
        user.value = null
    }



    return { toggleTheme, theme , user, login, logout, keepLocal, checkUser}
})