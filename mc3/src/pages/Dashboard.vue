<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-12">
        <q-container>
          <div class="text-h5 text-center">DashBoard - {{user.email}} </div>
          <q-card bordered class=" my-card">
            <q-card-section>
              <div class="text-h6 text-center"><u>PROGRESSION:</u></div>
            </q-card-section>
            <q-card-section>

            <q-linear-progress stripe rounded style="height: 20px" :value="progress2" color="warning" class="q-mt-sm" />
            <q-linear-progress stripe rounded style="height: 20px" :value="progress2" color="red" class="q-mt-sm" />
            <q-linear-progress stripe rounded style="height: 20px" :value="progress2" color="green" class="q-mt-sm" />
            <q-linear-progress stripe rounded style="height: 20px" :value="progress2" color="cyan" class="q-mt-sm" />
            <q-linear-progress stripe rounded style="height: 20px" :value="progress2" color="pink" class="q-mt-sm" />
            </q-card-section>

            <q-card-section>
              <q-btn fab icon="add" color="cyan" class="shadow-24" />
            </q-card-section>
          </q-card>
        </q-container>
      </div>
    </div>
    <div class="row justify-between q-pa-md ">
      <div class="col-md-5 col-xs-12 q-my-lg">
        <q-container>
          <q-card bordered class=" my-card">
            <q-card-section>
              <div class="text-h6 text-center"><u>NOTIFICATION:</u></div>
            </q-card-section>
            <q-card-section>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="33px">
                    <img src="https://cdn.quasar-framework.org/img/avatar.png" />
                    <q-badge floating color="teal">new</q-badge>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mary</q-item-label>
                  <q-item-label caption>2 new messages</q-item-label>
                </q-item-section>
                <q-item-section side>
                  3 min ago
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section>

              <q-btn fab icon="add" color="cyan" class="shadow-24" />
            </q-card-section>
          </q-card>
        </q-container>
      </div>
      <div class="col-md-5 col-xs-12 q-my-lg">
        <q-container>
          <q-card bordered class=" my-card">
            <q-card-section>
              <div class="text-h6 text-center"><u>CONNECTIONS:</u></div>
            </q-card-section>
            <q-card-section>
                      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Groups" label="Groups" />
          <q-tab name="Friends" label="Friends" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Groups">
            <div class="text-h6">Groups</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="Friends">
            <div class="text-h6">Friends</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>


        </q-tab-panels>
      </q-card>
            </q-card-section>
            <q-card-section>
              <q-btn fab icon="add" color="cyan" class="shadow-24" />
            </q-card-section>
          </q-card>
        </q-container>
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
    data(){
        return {
            user:{},
            progress2:0.7,
            tab: 'Friends'
        }
    },
    created(){
        this.$axios.get('/auth').then((res)=>{this.user = res.data;})
    }
}
</script>

<style scoped>

</style>
