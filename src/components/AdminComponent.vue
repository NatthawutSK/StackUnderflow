<script setup>
    import { ref } from 'vue';
    import { useUserStore } from "@/stores/user";
    import { useReportStore } from '@/stores/report';
    const userStore = useUserStore();
    const reportStore = useReportStore()
    const tab = ref(null);


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
                                       Ban User
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in userStore.allUser" >
                                    <td class="text-center" >{{ item.userName }}</td>
                                    <td class="text-center">{{ item.email }}</td>
                                    <td class="text-center">
                                        <v-btn @click="userStore.clickDel(item)">
                                            Ban
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">
                                       Report
                                    </th>
                                    <th class="text-center">
                                       View Post
                                    </th>
                                    <th class="text-center">
                                        Delete Post
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item,index in reportStore.allReport" >
                                    <td class="text-center"  >
                                        <p  v-for="report in item.report">{{ report }}</p>
                                    </td>
                                    <td class="text-center">
                                        <v-btn :to="`/forum/${item.post}`">
                                            View
                                        </v-btn>
                                    </td>
                                    <td class="text-center">
                                        <v-btn @click="reportStore.delReport(parseInt(item.post), index)">
                                            delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-container>

    </v-main>
</template>
