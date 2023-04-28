<script setup>
import { ref,reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required,minLength,maxLength,sameAs,email } from '@vuelidate/validators'
import { useUserStore } from "@/stores/user";
  const store = useUserStore();
  const step = ref(1);
  const show = ref(false);
  const cshow = ref(false);
  // const regisData = ref({
  //       fname : "",
  //       lname : "",
  //       username: "",
  //       email: "",
  //       password: "",
  //       cpassword:""
  //   })
  //   const complexPassword = (value) => {
  //       if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
  //         return false
  //       }
  //       return true
  //     }
  //   const validationRules = {
  //       fname:{
  //           required,
  //           minLength:minLength(5),
  //           maxLength:maxLength(15),
  //       },
  //       lname:{
  //           required,
  //           minLength:minLength(5),
  //           maxLength:maxLength(15),
  //       },
  //       username:{
  //           required,
  //           minLength:minLength(5),
  //           maxLength:maxLength(15),
  //       },
  //       email:{
  //           required,email
  //       },
  //       password:{
  //            required,
  //           minLength: minLength(8),
  //           complex: complexPassword,
  //       },
  //       cpassword:{
  //           required,
  //           sameAs: function (val) {
  //               return val == regisData.value.password;
  //           },
  //       }
  //   }
  //   const v$ = useVuelidate(validationRules, regisData)
  // const regData = ref({
  //     fname: '',
  //     lname: '',
  //     userName: '',
  //     email: '',
  //     password: ''
  // })
  // const loginData = ref({
  //     userName: '',
  //     password: ''
  // })


const test = ref(["hahahah"])
</script>
<template>

<v-container>
    <v-main>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
            <v-card class="elevation-6 mt-16" >
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4
                          class="text-center"
                        >Login in to Your Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           
                          <v-text-field
                          variant="outlined"
                            label="Username"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.loginData.username"
                           class="mt-16"
                          />
                          <v-text-field
                          variant="outlined"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                          v-model="store.loginData.password"
                          :type="show ?'text': 'password'"
                          :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                          @click:append="show=!show"
                          
                          />
                            
                          <v-btn  class="mb-3"  @click="store.login(store.loginData)" color="blue" dark block tile>Log in</v-btn>
                         
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
                    <v-col cols="12" md="5" class="blue rounded-br-xl">
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

                    <v-col cols="12" md="7">
                      <v-card-text class="mt-8">
                        <h4
                          class="text-center mb-3"
                        >Sign Up for an Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" @keyup.enter="step--">
                           <v-row>
                           <v-col cols="12" sm="6">
                            <v-text-field
                            variant="outlined"
                            label="First Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.regisData.fname"
                            :error-messages="store.v$?.fname?.$errors.map(e => e.$message)"
                            @input="store.v$?.fname?.$touch"
                           
                           class="mt-4"
                          />
                          <div>
                            
                          </div>
                        

                           </v-col>
                           <v-col cols="12" sm="6">
                            <v-text-field
                            variant="outlined"
                            label="Last Name"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.regisData.lname"
                            :error-messages="store.v$?.lname?.$errors.map(e => e.$message)"
                            @input="store.v$?.lname?.$touch"
                           
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
                            v-model="store.regisData.username"
                            :error-messages="store.v$?.username?.$errors.map(e => e.$message)"
                            @input="store.v$?.username?.$touch"
                           
                          />
                          <!-- {{ store.v$?.fname?.$errors.map(e => e.$message) }} -->
                          {{ store.v$?.cpassword?.$errors }}
                          <v-text-field
                          variant="outlined"
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.regisData.email"
                            :error-messages="store.v$?.email?.$errors.map(e => e.$message)"
                            @input="store.v$?.email?.$touch"
                           
                          />
                          <v-text-field
                            variant="outlined"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.regisData.password"
                            :error-messages="store.v$?.password?.$errors.map(e => e.$message)"
                            @input="store.v$?.password?.$touch"
                            :type="show ? 'text' : 'password'"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show = !show"
                          ></v-text-field>

                          <v-text-field
                            variant="outlined"
                            label="Confirm Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="store.regisData.cpassword"
                            :error-messages="store.v$?.cpassword?.$errors.map(e => e.$message)"
                            @input="store.v$?.cpassword?.$touch"
                            :type="cshow ? 'text' : 'password'"
                            :append-icon="cshow ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="cshow = !cshow"
                          ></v-text-field>

                          <v-btn @click="store.register(store.regisData),step--" color="blue" dark block tile>Sign up</v-btn>
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