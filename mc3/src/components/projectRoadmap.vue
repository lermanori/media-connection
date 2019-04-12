<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="row justify-between">
        <div class="col-6">
          <div class="text-h6">Roadmap {{roadmap}}</div>
        </div>
        <div class="col-5">
          <div class="text-h6 text-right text-grey">
            <q-btn class="q-mr-md" round @click='add_handle'>
              <q-icon name="add" style="font-size:3em" />
            </q-btn>
            <q-btn  class="q-mr-md" round @click='click_handle'>
              <q-icon name="close" style="font-size:3em" />
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
          <div class="q-px-lg q-pb-md">
    <q-timeline :layout="layout" color="secondary">
      <q-timeline-entry heading>
        {{projectName}}
      </q-timeline-entry>

      <q-timeline-entry v-for="(entry,index) in projectRoadmap" :key='index'
        :title='entry.title'
        :subtitle='entry.date'
        :side='entry.side'
        :color='entry.color'
        :icon='entry.icon'
      >
        <div>
          {{entry.description}}
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
    </q-card-section>

  </q-card>
</template>

<script>
export default {
props:['roadmap'],
methods:{
        click_handle(){
            this.$emit('closeRoadmap')
        },
        add_handle(){
            this.$emit('showAddEntry')
        }
    },
computed:{
        layout () {
        return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
        },
        projectName() {
            return this.$store.getters.projects[this.roadmap].project_name
        },
        projectRoadmap() {
            return this.$store.getters.projects[this.roadmap].project_roadmap
        }
    }
}

</script>

<style scoped>
.q-card{
    z-index: 3;
}

</style>
