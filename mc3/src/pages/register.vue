<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-xl">
      <q-card-section>
        <div class="q-mb-md text-h6 text-center">Register</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input v-model="email" label="Enter email"></q-input>
            <q-input v-model="password" label="Enter password"></q-input>
            <q-input v-model="passwordMatch" label="RE-Enter password"></q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="demoAuth(email,password)" 
                class="q-mt-md" 
                color="primary">Register</q-btn>
      </q-card-section>
      <q-card-section class="text-center">

        <q-btn  @click="login"
                class="q-mt-md" 
                color="red">google+</q-btn>
      </q-card-section>
    </q-card>
    <div class="row">
      
        <q-banner v-if="!auth" class="bg-primary q-pa-md text-white text-center text-h6 text-weight-light fixed-bottom">
              Unfortunately, username or password isnt correct, please try again.
        </q-banner>
      
    </div>
  </q-page>
</template>

<style></style>

<script>
//import axios from "axios"
import baseURL from '../baseUrl.js'
import services from '../services.js'

export default {
  name: "Register",
  data(){
    return {
      email:"",
      password:"",
      passwordMatch:"",
      baseURL:baseURL,
      auth:true
    }
  },
  methods:{
    demoAuth(email,password){
        if(email=='ori' && password=='1234' && this.password == this.passwordMatch ){
          this.$router.push('/taskManager')
          /*
          axios.post('auth/local-register',{email:email,password:password}).then((data)=>{
            }).catch((err)=>{
              this.auth = false
          
          })
          */
        }
        else{
          this.auth = false

        }
      },
    login(){
      services.login().catch((err)=>{console.log(err)}).then(()=>{
        this.$store.dispatch('auth',services.auth())
      });
    }
    }
};
</script>