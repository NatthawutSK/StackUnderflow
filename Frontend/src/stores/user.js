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
    // const user2 = JSON.parse(document.cookie.split('=')[2] || null);
    const regisData = ref({
        fname : "",
        lname : "",
        username: "",
        email: "",
        password: "",
        cpassword:""
    })
    const profiledata = ref([])
    const following = ref([])
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
        const sweet = await Swal.fire({
            icon: fetchingData.data.status,
            title: fetchingData.data.message,
            confirmButtonText: 'Close'
        })
        if(fetchingData.data.status == "success"){
            document.cookie = `token=${fetchingData.data.token}; path=/;`;
            authen()
            route.push('/')
        }
    }


    const authen = async () =>{
            const fetchingData = await axios.get('/user/me' )
            user.value = fetchingData.data 
            // document.cookie = `user=${JSON.stringify(fetchingData.data)}; path=/;`
    }

    const logout = () => {
        user.value = {}
        document.cookie = "token=; max-age=-1; path=/;";
        // document.cookie = "user=; max-age=-1; path=/;";
    }

    const getprofiledata = async(id) =>{
        const fetchData = await axios.get(`/getprofile/${id}`)
        console.log(fetchData);
        return fetchData.data
    }
    const follow = async(follow,followby)=>{
        const fetchData = await axios.post('/follow',{mem_id:follow,followby_id:followby})
            profiledata.value.follower = fetchData.data.follow
    }
    const getfollowing = async() =>{
        const fetchData = await axios.get(`/following/`)
        following.value = fetchData.data
    }
    
    const updateprofile = async(data,invalid)=>{
        console.log(invalid);
        if(!invalid){
        const fetchData = await axios.put('/updateuser',data)
        const sweet = await Swal.fire({
            icon: fetchData.data.status,
            title: fetchData.data.message,
            confirmButtonText: 'Close'
          })
        user.value.mem_fname = data.fname
        user.value.mem_lname = data.lname
        user.value.mem_email = data.email
        user.value.mem_user_name = data.username
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Please fill out'
            })
        }
    }
    const changePassword = async(data,invalid)=>{
        if(!invalid){
        const fetchData = await axios.put('/changepassword',data)
        console.log(fetchData.data);
        const sweet = await Swal.fire({
            icon: fetchData.data.status,
            title: fetchData.data.message,
            confirmButtonText: 'Close'
          })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Please fill out'
            })
        }
    }




    // profile image

    const fileImg = ref(null);
    const imageURL = ref(null);
      async function previewImage(event) {
        const file = event.target.files[0];
        fileImg.value = event.target.files[0];
        const maxFileSize = 1048576; // 1 MB file size limit
        if(file.size > maxFileSize){
            const sweet = await Swal.fire({
                icon: "error",
                title: "image size can not more than 1 MB",
                confirmButtonText: 'Close'
              })
              imageURL.value = null;

        } else if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
  
          reader.onload = () => {
            imageURL.value = reader.result;
          };
  
          reader.readAsDataURL(file);
        } else {
          imageURL.value = null;
          const sweet = await Swal.fire({
            icon: "error",
            title: "Invalid file. Please select an image.",
            confirmButtonText: 'Close'
          })
          
        }
      }

      
      const changePic = async(mem_id) =>{
        console.log(fileImg.value);
        const fetchData = await axios.post('/profile/pic',
        {
            mem_pic: fileImg.value,
            mem_id: mem_id
        },{
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        // console.log(fetchData.data.mem_pic);
        user.value.mem_pic = fetchData.data.mem_pic.replace(/\\/g, "/");
        imageURL.value = null
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
        v2$,
        // user2,
        getprofiledata,
        profiledata,
        follow,
        getfollowing,
        following,
        updateprofile,
        changePassword
        previewImage,
        imageURL,
        changePic,
        
    }
})