import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import axios from '@/plugins/axios';
export const useReportStore = defineStore('report', () => {
    const allReport = ref([]);
    const userReported = ref([])
    const  addReport = async(report, id) => {
        console.log('sad',id);
      const fetchData =  await axios.post('/report',{content:report,postId:id})
      console.log(fetchData.data);
    }
    const getReport = async() =>{
        const fetchData = await axios.get('/report')
        const userData = await axios.get('/reportuser')
        allReport.value = fetchData.data
        userReported.value = userData.data
    }
    const updateStatus = async(status,id) =>{
        const fetchData = await axios.put('/report',{status:status,reportId:id})
        if(status === 'Innocent'){
            allReport.value = allReport.value.filter((val) => (val.report_id != id))
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