import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import axios from '@/plugins/axios';
export const useReportStore = defineStore('report', () => {
    // const allReport = useLocalStorage('report', [])
    const  addReport = async(report, id) => {
        console.log('sad',id);
      const fetchData =  await axios.post('/report',{content:report,postId:id})
      console.log(fetchData.data);
    }
    return {
        addReport,
    }
})