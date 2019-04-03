<template>
    <q-page>
        <q-page-container>
            <div class="row">
                <div class="col">
                    <q-page-sticky position="top" expand class="bg-accent text-white">
                        <q-toolbar>
                        <q-btn flat round dense icon="map" />
                        <q-toolbar-title>Grid</q-toolbar-title>
                        </q-toolbar>
                    </q-page-sticky>
                </div>
            </div>
        </q-page-container>
        <q-page-container class="q-mx-sm">
                <div class="row justify-center" v-for="index in 10" :key="index">
                        <div class="col-3 text-center">
                            <q-img class="app-img q-mx-auto"  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"></q-img>
                        </div>
                        <div class="col-3">
                            <q-img class="app-img q-mx-auto"  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" ></q-img>
                        </div>
                        <div class="col-3">
                            <q-img class="app-img q-mx-auto" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"></q-img>
                        </div>
                </div>
        </q-page-container>
    </q-page>
</template>

<style>
.app-img{
    border: 0.5px solid gray;
    border-radius: 5px;
    height: 200px;
    width: 200px;
}
</style>

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
  }
}
</script>