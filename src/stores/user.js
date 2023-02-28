import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed} from "vue";
export const useUserStore = defineStore('user', () =>{
    const theme = useLocalStorage('theme', 'light')
    const allUser = useLocalStorage('allUser', [])
    const logingUser = useLocalStorage('loging', {})
    // const user_del = ref('')
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
    function clickDel(user){
        // allUser.value.push(user)
        allUser.value.splice(allUser.value.findIndex(arrayItem => arrayItem.userName === user.userName),1)
        // user_del.value = user
        // console.log(user.userName);
        // console.log(allUser.value[0].userName);

    }
    // const delUser =  computed(() =>{
    //         return allUser.value
    // })
    // function delUser(user){
    //     // console.log(user);
    //     this.allUser = this.allUser.filter((item) =>{
    //         return item.userName !== user.userName
    //     })

    // }
    
    return { toggleTheme, theme, login, logout, keepLocal, logingUser, allUser, clickDel}
})