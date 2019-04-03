<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Projects</div>
    </q-card-section>
    <div v-for="(project,index) in projectsArr" :key="index">
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-md-4">
            <div class="text-caption text-color-grey">Projects</div>
            <div class="text-h6 text-weight-light">{{project.project_name}}</div>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-2">
            <div class="text-caption">Person</div>
            <div class="text-subtitle1">{{project.project_person}}</div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-2">
            <div class="text-caption">due by</div>
            <div class="text-subtitle1">{{project.project_due_by}}</div>
          </div>
          <div class="col-xs-2 col-sm-4 col-md-2">
            <div class="text-caption">status</div>
            <div class="text-subtitle1">{{project.project_status}}</div>
          </div>
          <div class="col-xs-2 col-sm-4 col-md-2">
            <div class="text-caption">roadmap</div>
            <q-btn round @click="click_handle(index)">
              <q-icon name="directions" style="font-size:3em" />
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
    </div>
  </q-card>
</template>

<script>
export default {
  computed: {
    projectsArr() {
      return this.$store.getters.projects;
    }
  },
  methods: {
    click_handle: function(index) {
      this.$emit('toRoadmap',index)
    }
  },
  created(){
    this.$store.dispatch('syncProjects');
  }
};
</script>

<style scoped>
.text-caption {
  color: gray;
}
.q-card{
  z-index: 10;
}
</style>
