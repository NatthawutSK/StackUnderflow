import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useUserStore = defineStore('user', () => {
    const theme = useLocalStorage('theme', 'light')
    const allUser = useLocalStorage('allUser', [{
        fname: "ri&au",
        lname: "haha",
        email: "gg",
        userName: "admin",
        password: "12345"
    }])
    const logingUser = useLocalStorage('loging', {})
    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function keepLocal(info) {
        allUser.value.push(info)
    }


    function login(data) {
        allUser.value.map((item) => {
            if (item.userName === data.userName && item.password === data.password) {
                logingUser.value = (item)
            }

        })
    }

    function logout() {
        logingUser.value = {}
    }

    function clickDel(user) {
        allUser.value.splice(allUser.value.findIndex(arrayItem => arrayItem.userName === user.userName), 1)
    }

    function editUser(edited) {
        logingUser.value.fname = edited.fname
        logingUser.value.lname = edited.lname
        logingUser.value.userName = edited.userName
        logingUser.value.email = edited.email
        logingUser.value.password = edited.password
    }
    const filterUser = computed(() => {
        return allUser.value.filter((user) =>{
            return user.userName !== "admin"
        })
    })

    return {
        toggleTheme,
        theme,
        login,
        logout,
        keepLocal,
        logingUser,
        allUser,
        clickDel,
        editUser,
        filterUser
    }
})