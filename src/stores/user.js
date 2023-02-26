import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () =>{
    const theme = useLocalStorage('theme', 'light')
    const allUser = useLocalStorage('allUser', [])
    const logingUser = useLocalStorage('loging', {})
    function toggleTheme(){
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    function keepLocal(info){
        allUser.value.push(info)
        
    }
    function login(data){
       allUser.value.map((item) => {
           if(item.userName === data.userName && item.password === data.password){
                logingUser.value = (item)
                // console.log(item);
                // location.reload();
                console.log("u are loging in")
           }
        })
    }

    function logout(){
        logingUser.value = null
        location.reload();
    }
    return { toggleTheme, theme, login, logout, keepLocal, logingUser}
})