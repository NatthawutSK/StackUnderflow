<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
  const store = useUserStore();
  const step = ref(1);
  const show = ref(false);
  const regData = ref({
      fname: '',
      lname: '',
      userName: '',
      email: '',
      password: ''
  })
  const loginData = ref({
      userName: '',
      password: ''
  })

</script>
<template>

<v-container>
    <v-main>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
            <v-card class="elevation-6 mt-16"  >
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4
                          class="text-center"
                        >Login in to Your Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" @keyup.enter="store.login(loginData), $router.back()">
                           
                          <v-text-field
                          variant="outlined"
                            label="Username"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="loginData.userName"
                           class="mt-16"
                          />
                          <v-text-field
                          variant="outlined"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                          v-model="loginData.password"
                          :type="show ?'text': 'password'"
                          :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                          @click:append="show=!show"
                          
                          />
                            
                          <v-btn href="/"  @click="store.login(loginData)" color="blue" dark block tile>Log in</v-btn>
                     
                         
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Don't Have an Account Yet?</h3>
                        <h6
                          class="text-center"
                        >Let's get you all set up so you can start creating your your first</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row >
                    <v-col cols="12" md="6" class="blue rounded-br-xl">
                     <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Alredy Signed up?</h3>
                        <h6
                          class="text-center"
                        >Log in to your account so you can continue<br> building and  editing your Forum</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn  tile outlined dark @click="step--">Log in</v-btn>
                      </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-8">
                        <h4
                          class="text-center mb-3"
                        >Sign Up for an Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" @keyup.enter="store.keepLocal(regData),step--">
                           <v-row>
                           <v-col cols="12" sm="6">
                            <v-text-field
                            variant="outlined"
                            label="First Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="regData.fname"
                           class="mt-4"
                          />
                           </v-col>
                           <v-col cols="12" sm="6">
                            <v-text-field
                            variant="outlined"
                            label="Last Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="regData.lname"
                           class="mt-4"
                          />
                           </v-col>
                           </v-row>
                           <v-text-field
                           variant="outlined"
                            label="Username"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="regData.userName"
                          />
                          <v-text-field
                          variant="outlined"
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="regData.email"
                          />
                          <v-text-field
                          variant="outlined"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                          v-model="regData.password"
                          :type="show ?'text': 'password'"
                          :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                          @click:append="show=!show"
                          
                          />

                          <v-btn @click="store.keepLocal(regData),step--" color="blue" dark block tile>Sign up</v-btn>
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>