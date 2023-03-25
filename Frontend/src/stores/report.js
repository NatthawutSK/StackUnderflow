import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useReportStore = defineStore('report', () => {
    const allReport = useLocalStorage('report', [])
    function addReport(report, id) {
        allReport.value.push({ report: report, post: id })
    }
    return {
        allReport,
        addReport,
    }
})