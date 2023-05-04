<script setup>
import { ref,onMounted } from 'vue';
import { useUserStore } from "@/stores/user";
import { useReportStore } from '@/stores/report';
const userStore = useUserStore();
const reportStore = useReportStore();
const tab = ref(null);
onMounted(reportStore.getReport)

</script>

<template>
    <v-main>
        <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
            <v-tab value="one">manage user</v-tab>
            <v-tab value="two">report</v-tab>
        </v-tabs>

        <v-container>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        User Name
                                    </th>
                                    <th class="text-center">
                                        Email
                                    </th>
                                    <th class="text-center">
                                        Post Reported
                                    </th>
                                    <th class="text-center">
                                        Ban User
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in reportStore.userReported">
                                    <td class="text-center">{{ item.mem_user_name }}</td>
                                    <td class="text-center">{{ item.mem_email }}</td>
                                    <td class="text-center">{{ item.Post_Reported }}</td>
                                    <td class="text-center">
                                        <v-btn @click="reportStore.banUser(item.mem_id)">
                                            Ban
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-card class="ma-5 pa-5" v-for="item, index in reportStore.allReport">
                            <v-card-title class="text-wrap">Title: {{item.post_title}}</v-card-title>
                            <v-card-title>Description:</v-card-title>
                            <v-card-text class="text-h6" v-html="item.post_desc"></v-card-text>
                            <div class="d-flex justify-end" >
                                <v-btn class="ma-3" @click="reportStore.updateStatus('Guilty',item.report_id),item.status = 'Guilty'">Guilty</v-btn>
                                <v-btn class="ma-3" @click="reportStore.updateStatus('Innocent',item.report_id)">Innocent</v-btn>
                            </div>
                            <div v-if="item.status === 'Guilty'" class="d-flex justify-end">
                                <v-btn @click="reportStore.deletePost(item.post_id)">Delete this Forum</v-btn>
                            </div>
                            
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-container>

    </v-main>
</template>
<style>

.ql-syntax{
    background: #414449;
    color: #b3bccc;
    word-wrap: break-word;
    white-space: pre;
    font-size: 13pt;
    tab-size: 4;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .75);
  }
  .ql-syntax{
    margin:10px ;
    padding: 15px;
  }
  code{
    background: #ebebeb;
    padding: 5px;
    margin: 2px;
    color:black;
    border-radius: 5px;
    font-size: 13pt;
  }
  
</style>