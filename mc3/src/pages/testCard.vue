<template>
  <app-card></app-card>
</template>
<<script>
 import card from '../components/cardFriendPending.vue'
//import card from '../components/card.vue'

export default {
    components:{
        "app-card": card,
    },
    data() {
        return {
             mydata:[
        {
            mode: "text",
            key:"Text color",
            value:"yellow taxi. the quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over quick brown fox jumped over "
        },
        {
            mode: "photo",
            key:"age",
            value:"https://i.imgur.com/nHgz4Ck.jpg"
        },
        {
            key:"atmosphere",
            value: "#ffd123",
            mode: "color",
        },
        {
            key:"audience",
            value:  '2019/02/01',
            mode: "date",
        },
        {
            key:"KAkiiasdad",
            value:"0101001010010101"
        },
        {
            key:"Hex",
            value:"11111111111111 11111111111111 FFBB00123adss ssssssss ssssssssssss ssssss FFBB00123adss ssssssssss sssssssssssssssss"
        },
    ],
    myData2: []
        }
    },
    created(){
        // this.$store.dispatch("Friend/syncFriends").then(x => {
        //     console.log("x",x.data.user.pendingReq);
        //     this.$store.dispatch("Friend/transformIdToUsers",x.data.user.pendingReq).then(x => {
        //         console.log("res11",x.data.result);
        //         this.myData2 = x.data.result;
        // })});
    }
}
</script>

<style scoped>
</style>