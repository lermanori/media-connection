<template>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">daily scrum meeting</div>
      </q-card-section>

      

      <q-card-section>
        <q-input dark v-model="dailyMeeting.hasDone" :label='hasDone_msg'></q-input>
        <q-input dark v-model="dailyMeeting.toBeDone" :label='toBeDone_msg'></q-input>
        <q-input dark v-model="dailyMeeting.obstacles" :label='obstacles_msg'></q-input>
        <q-input dark filled v-model="dailyMeeting.date" :mask='dailyMeeting.date' :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy :breakpoint="600">
                <q-date dark v-model="dailyMeeting.date" filled />
            </q-popup-proxy>
            </q-icon>
        </template>
        </q-input>
      </q-card-section>
      <q-btn fab icon="add" color="accent" class="shadow-24" />
    </q-card>
</template>

<script>
    import { date } from 'quasar'
    let timeStamp = Date.now()
    let formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
export default {
    data () {
        return {
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            hasDone_msg:'what has been Done since last meeting',
            toBeDone_msg:'what whould be complete till next meeting',
            obstacles_msg:'obastacles that would be in the way',
            dailyMeeting:{
                hasDone:'',
                toBeDone:'',
                obstacles:'',
                date: formattedString
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
