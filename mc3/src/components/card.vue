<template>
  <div class="row justify-center q-mt-xl">
    <template v-for="(item, index) in arr">
      <div class="col-auto q-pa-md" :key="index">
        <q-card fluid flat bordered class="my-card" :key="index">
          <q-card-section class="q-mb-none">
            <div class="text-h5 text-center q-mb-none">
              <b>{{item.key}}</b>
            </div>
          </q-card-section>
          <q-separator inset :key="index" />
          <q-card-section
            class="q-pa-none"
            :key="index"
            :style="{backgroundColor:item.mode == 'color'? item.value:'white' }"
          >
            <h6 class="q-ma-none text-left" v-if="item.mode == 'text'">{{item.value}}</h6>

            <q-img
              :key="index"
              :src="item.value"
              class="q-ma-none text-left"
              v-if="item.mode == 'photo'"
            ></q-img>

            <h6 class="q-ma-none text-left" v-if="item.mode == 'color'">{{item.value}}</h6>

            <q-date
              class="q-ma-none q-pa-none text-left"
              v-if="item.mode == 'date'"
              :value="item.value"
              readonly="true"
            />
          </q-card-section>
        </q-card>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["arr"]
  // data() {
  //     return {

  //     }
  // },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .my-card {
    width: 100%;
    min-width: 70vw;
  }
}
@media only screen and (min-width: 601px) {
  .my-card {
    min-width: 200px;
    max-width: 50vw;
  }
}
.q-date {
  transform: scale(0.8);
}
</style>