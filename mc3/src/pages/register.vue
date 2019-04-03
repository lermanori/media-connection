<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input @click="auth=true" v-model="username" label="Enter username"></q-input>
            <q-input v-model="password" label="Enter password"></q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn @click="demoRegister(username,password)" 
                class="mt-xs" 
                color="primary">Login</q-btn>
      </q-card-section>
    </q-card>
    <div class="row">
      
        <q-banner v-if="!auth" class="bg-primary text-white fixed-bottom">
              Unfortunately, username or password isnt correct, please try again.
        </q-banner>
      
    </div>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "Register",
  data(){
    return {
      username:"",
      password:"",
      auth:'true'
    }
  },
  methods:{
    demoRegister(username,password){
        if(username=='ori' && password=='1234'){
          this.$router.push('/taskManager')
        }
        else{
          this.auth = false
        }
      }
    }
};
</script>