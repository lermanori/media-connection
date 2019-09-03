<template>
  <div class="row justify-center q-my-sm q-gutter-sm">
    <q-list>
      <template v-for="(item, index) in arr">
        <q-expansion-item popup label="property" :caption="item.key" :key="index">
          <div class="col-auto q-pa-md">
            <q-card fluid flat bordered style="height:100%" class="my-card">
              <q-card-section class="q-mb-none">
                <div class="text-h5 text-center q-mb-none">
                  <b>{{item.key}}</b>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section
                class="q-pa-none"
                :style="{backgroundColor:item.mode == 'color'? item.value:'white' }"
              >
                <h6 class="q-ma-xs text-left" v-if="item.mode == 'string'">{{item.value}}</h6>
                <q-img :src="item.value" class="q-ma-none text-left" v-if="item.mode == 'photo'"></q-img>
                <h6 class="q-ma-none text-left" v-if="item.mode == 'color'">{{item.value}}</h6>
                <q-date
                  class="q-ma-md q-pa-none text-left"
                  v-if="item.mode == 'date'"
                  :value="item.value"
                  :readonly="true"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-expansion-item>
        <q-separator :key="index" />
      </template>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["arr"]

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