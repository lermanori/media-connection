<template>
      <q-card bordered class=" my-card" style="width: 700px; height:450px;max-height: 80vw; max-width: 80vw;overflow:visible">
      <q-card-section>
        <div class="text-h6">Add a New Entry</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="newEntry.title" :label='entry_title_msg'></q-input>
        <q-input  v-model="newEntry.side" :label='entry_side_msg'></q-input>
        <q-input  v-model="newEntry.color" :label='entry_color_msg'></q-input>
        <q-input  v-model="newEntry.icon" :label='entry_icon_msg'></q-input>
        <q-input  v-model="newEntry.description" :label='entry_description_msg'></q-input>
        <q-input  filled v-model="newEntry.date" :mask='newEntry.date' :rules="['date']">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy :breakpoint="600">
                <q-date  v-model="newEntry.date" filled />
            </q-popup-proxy>
            </q-icon>
        </template>
        </q-input>
      </q-card-section>
      <q-btn fab icon="add" color="cyan" class="shadow-24" @click="addEntry({entry:newEntry,index:roadmapIndex})" />
    </q-card>
</template>

<script>
    import { date } from 'quasar'
    let timeStamp = Date.now()
    let formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
export default {
    props:['roadmapIndex'],
    data () {
        return {
            entry_title_msg:'what is the entry title',
            entry_side_msg:'what side to display',
            entry_color_msg:'what color to use',
            entry_icon_msg:'what icon to use',
            entry_description_msg:'enter description',
            newEntry:{
                title:'',
                side:'',
                icon:'',
                description:'',
                color:'',
                date: formattedString,
            }
        }
    },
    methods:{
        addEntry(arg){
            const obj = {
                index:arg.index,
                entry:{
                    title: arg.entry.title,
                    side: arg.entry.side,
                    icon: arg.entry.icon,
                    description: arg.entry.description,
                    color:arg.entry.color,
                    date: arg.entry.date
                }                
            }
            this.$store.dispatch('addEntry',obj)
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


