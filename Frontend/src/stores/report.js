import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import axios from '@/plugins/axios';
export const useReportStore = defineStore('report', () => {
    const allReport = ref([]);
    const userReported = ref([])
    const  addReport = async(report, id,mem_id) => {
        console.log('sad',id);
      const fetchData =  await axios.post('/report',{content:report,postId:id,mem_id:mem_id})
      console.log(fetchData.data);
    }
    const getReport = async() =>{
        const fetchData = await axios.get('/report')
        const userData = await axios.get('/reportuser')
        allReport.value = fetchData.data
        userReported.value = userData.data
    }
    const updateStatus = async(status,id,mem_id) =>{
        const fetchData = await axios.put('/report',{status:status,reportId:id})
        if(status === 'Innocent'){
            allReport.value = allReport.value.filter((val) => (val.report_id != id))
            userReported.value = userReported.value.map((val)=>{
                console.log(val.report_id, id);
                if(val.mem_id == mem_id){
                    val.Post_Reported -= 1
                }
                return val
            })
        }
        console.log(fetchData.data);
    }
    const deletePost = async(id) =>{
        const fetchData = await axios.delete(`post/delete/${id}`)
        allReport.value = allReport.value.filter((val) => (val.post_id != id))
        alert(`Delete ${id} la`)
    }
    const banUser = async(id) =>{
        const fetchData = await axios.post('/ban',{id:id})
        userReported.value = userReported.value.filter((val) => (val.mem_id != id))
        console.log(fetchData.data);
    }
    return {
        addReport,
        allReport,
        userReported,
        getReport,
        updateStatus,
        deletePost,
        banUser
    }
})