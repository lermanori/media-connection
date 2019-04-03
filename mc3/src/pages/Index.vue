<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">CM</div> 
      </q-card-section>
      <q-card-section>
        {{welcome_msg}}
      </q-card-section>
      <q-btn-group class="m-t-2" spread>
      <q-btn color="primary" icon="timeline">Login</q-btn>
      <q-btn color="secondary" to="/register">Register</q-btn>
      </q-btn-group>
    </q-card>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "PageIndex",
  data(){
    return {
      welcome_msg:"welocome to our app, login or register please."
    }
  }
};
</script>
