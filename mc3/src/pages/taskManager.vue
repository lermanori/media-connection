<template>
    <q-page>
        <div class="row justify-center q-pa-md">
            <div class="col-12">
                <app-table-projects @toRoadmap='toRoadmapHandler'/>
                <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp" >
                    <app-project-roadmap @showAddEntry='showAddRoadmapHandler' @closeRoadmap='closeRoadmapHandler' class="q-my-md" :roadmap='currentIndex'  v-if="showRoadmap"/>
                </transition> 
                <q-dialog v-model="card">
                    <app-add-entry :roadmap-index='currentIndex'/>
                </q-dialog>
            </div>
        </div>
        <div class="row justify-between q-pa-md ">
            <div class="col-md-5 col-xs-12 q-my-lg">
                <app-daily-scrum-meeting/>
            </div>
            <div class="col-md-5 col-xs-12 q-my-lg">
                <app-add-new-project/>
            </div>
        </div>

    </q-page>
</template>

<script>
import dailyScrumMeeting from '../components/DailyScrumMeeting'
import tableProjects from '../components/TableProject'
import addNewProject from '../components/AddNewProject'
import projectRoadmap from '../components/ProjectRoadmap';
import addEntry from '../components/AddEntry'

export default {
    components:
    {
        'app-daily-scrum-meeting': dailyScrumMeeting,
        'app-table-projects': tableProjects,
        'app-add-new-project': addNewProject,
        'app-project-roadmap': projectRoadmap,
        'app-add-entry':addEntry
    },
    data(){
        return {
            showRoadmap:false,
            showAddRoadmap:false,
            currentIndex:0,
            card: false,
        }
    },
    computed:{
        addRoadmap(){
            return this.showAddRoadmap;
        }
    },
    methods:{
        toRoadmapHandler(arg)
        {
            this.currentIndex = arg
            this.showRoadmap = true
        },
        closeRoadmapHandler()
        {
            this.showRoadmap = false;
        },
        showAddRoadmapHandler()
        {
            this.showAddRoadmap = true;
            this.card=true;
            console.log(this.showAddRoadmap)
        },
        closeAddRoadmapHandler()
        {
            this.showAddRoadmap = false;
            console.log(this.showAddRoadmap)

        }
    }
}
</script>

<style>

</style>
