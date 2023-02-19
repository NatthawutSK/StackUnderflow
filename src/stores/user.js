import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
// import { ref } from "vue";

export const useUserStore = defineStore('user', () =>{
    const theme = useLocalStorage('theme', 'light')
    const user = useLocalStorage('user', {})
    function toggleTheme(){
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    async function login(id){
        const res = await fetch(`https://www.melivecode.com/api/users/${id}`)
        const result = await res.json()
        console.log(result.user);
        user.value = result.user
    }

    function logout(){
        user.value = null
        // console.log(localStorage.getItem('user'))
        // localStorage.removeItem('user');
    }



    return { toggleTheme, theme , user, login, logout}
})