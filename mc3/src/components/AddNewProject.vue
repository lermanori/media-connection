<template>
    <q-card bordered class=" my-card">
      <q-card-section>
        <div class="text-h6">Add a New Project</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="newProject.project_name" :label='project_name_msg'></q-input>
        <q-input  v-model="newProject.project_person" :label='project_person_msg'></q-input>
        <q-input  v-model="newProject.project_status" :label='project_status_msg'></q-input>
        <q-input  filled v-model="newProject.project_due_by" :mask='newProject.project_due_by' :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy :breakpoint="600">
                <q-date  v-model="newProject.project_due_by" filled />
            </q-popup-proxy>
            </q-icon>
        </template>
        </q-input>
      </q-card-section>
      <q-btn fab icon="add" color="cyan" class="shadow-24" @click="addProject(newProject)" />
    </q-card>
</template>

<script>
    import { date } from 'quasar'
    let timeStamp = Date.now()
    let formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
export default {
    data () {
        return {
            project_name_msg:'what is the projects name',
            project_person_msg:'who is behind this project',
            project_status_msg:'status of the project (def. created)',
            newProject:{
                project_name:'',
                project_person:'',
                project_status:'created',
                project_due_by: formattedString,
                project_roadmap: []
            }
        }
    },
    methods:{
        addProject(proj){
            const obj = {
                project_name:proj.project_name,
                project_person:proj.project_person,
                project_status:proj.project_status,
                project_due_by: proj.project_due_by,
                project_roadmap: proj.project_roadmap
            };
            try{
                this.$store.dispatch('addProject',obj).catch((err)=>{alert(err)})
            }
            catch(err)
            {
                alert(err)
            }
        }
    }
}
</script>

<style scoped>
.q-btn--fab{
    position: absolute;
    top:92%;
    left:45%;
}


</style>
