<template>
    <v-main>

       
            <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
                <v-tab value="one">manage user</v-tab>
                <v-tab value="two">Item Two</v-tab>
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
                                        Delete Post
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in allUser" >
                                    <td class="text-center" >{{ item.userName }}</td>
                                    <td class="text-center">{{ item.email }}</td>
                                    <td class="text-center">
                                        <v-btn @click="delUser(item)">
                                            delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>

                    <v-window-item value="two">
                        Two
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-container>

    </v-main>
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/user";
const {allUser, delUser} = useUserStore();
const tab = ref(null);

// export default {
//     data: () => ({
//         tab: null,
//         desserts: [
//           {
//             name: 'Frozen Yogurt',
//             calories: 159,
//           },
//           {
//             name: 'Ice cream sandwich',
//             calories: 237,
//           },
//           {
//             name: 'Eclair',
//             calories: 262,
//           },
//           {
//             name: 'Cupcake',
//             calories: 305,
//           },
//           {
//             name: 'Gingerbread',
//             calories: 356,
//           },
//           {
//             name: 'Jelly bean',
//             calories: 375,
//           },
//           {
//             name: 'Lollipop',
//             calories: 392,
//           },
//           {
//             name: 'Honeycomb',
//             calories: 408,
//           },
//           {
//             name: 'Donut',
//             calories: 452,
//           },
//           {
//             name: 'KitKat',
//             calories: 518,
//           },
//         ],
//     }),
// }
</script>