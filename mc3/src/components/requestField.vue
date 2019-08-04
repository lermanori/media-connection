<template>
  <div class="container">
    <div class="row text-center justify-left">
      <div class="col-1 q-pt-lg">
        {{value}}
        <q-checkbox label="disable" @input="$emit('input',value)" v-model="value.disabled"/>
      </div>
      <div class="col-3 q-pt-lg">
        <q-btn-dropdown color="primary" :label="buttonText" :disable="value.disabled">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick('photo')">
              <q-item-section>
                <q-item-label>Photo</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick('string')">
              <q-item-section>
                <q-item-label>String</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <div class="col-6 q-pa-sm" v-if="choseType">
        <app-dynamic :disabled="value.disabled" :mode=mode :value="value" @input="handleInput" />
      </div>
          
    </div>
  </div>
</template>

<script>
import dynamicKeyValue from "./dynamicKeyValue.vue";

export default {
  data() {
    return {
      checked:  true ,
      choseType: false,
      mode: "",
      buttonText: "data type",
      once:true,
      obj:{},
      my_id:null,
      
    };
  },
  computed:{
    disabled(){
      return this.value.disabled;
    },

  },
  watch: {

  },

  methods: {
    onItemClick(mode) {
      this.choseType = true;
      this.mode = mode;
      this.buttonText = mode;
    },
    handleInput(e){
      e.disabled = this.value.disabled;
      e.id = this.my_id;
      this.$emit("input", e);
    },
    handleInputCheckBox(e){
      this.checked = !this.checked;
      this.handleInput(e);      
    }
  },
  components: {
    "app-dynamic": dynamicKeyValue
  },

  props: ["value","id",],
  created(){
    if (this.once)
    {
      this.my_id = this.id;
      console.log(this.my_id);
      this.once=false;
    }
  }

};
</script>

<style scoped>
</style>
