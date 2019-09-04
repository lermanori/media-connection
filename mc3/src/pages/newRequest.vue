<template>
  <div>
    <app-request-field :id="`-1`" :value="uploadAt" @input="(arg)=>uploadAt=arg" required="true" />
    <app-request-field
      v-for="(prop,index) in Properties"
      :id="`${prop.id}`"
      :key="`${prop.id}`"
      :value="prop"
      @input="(arg)=>properties[index]=arg"
    ></app-request-field>
    <div class="row jusytify-center q-mt-md">
      <div class="col text-right" style="margin-right:13%;">
        <q-btn class="q-mr-md" round icon="exit_to_app" color="purple" dark to="/requests"></q-btn>
        <q-btn class="q-mr-md" round icon="delete" color="black" dark @click="clean_handler"></q-btn>
        <q-btn
          class="q-mr-md"
          round
          icon="add"
          color="cyan"
          @click="properties.push({id:`${id}`,disabled:false});id++"
        ></q-btn>
        <q-btn class="q-mr-xl" round icon="done" color="indigo" @click="handle_click_save">
          <q-popup-proxy v-model="opened">
            <q-banner>
              <template v-slot:avatar>
                <q-icon name="save" color="primary" />
              </template>
              Save Schema as Template?
              <template v-slot:action>
                <q-input
                  v-if="save==true"
                  rounded
                  outlined
                  label="Enter Schema Name"
                  v-model="schemaName"
                />
                <q-btn flat color="indigo" label="Dismiss" @click="opened=false" />
                <q-btn flat color="indigo" :label="save_txt" @click="handle_save_schema" />
              </template>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import requestField from "../components/requestField";

export default {
  data() {
    return {
      properties: [],
      clicked: false,
      clean: false,
      opened: false,
      schemaName: "",
      save: false,
      id: 0,
      uploadAt: {
        id: "-1",
        disabled: false,
        mode: "date",
        key: "hggj",
        disabled: false
      }
    };
  },
  computed: {
    save_txt() {
      return this.save ? "Save" : "Enter";
    },
    Clicked() {
      return this.clicked;
    },
    Properties() {
      return this.properties;
    }
  },
  components: {
    "app-request-field": requestField
  },
  methods: {
    log(arg) {
      console.log(arg);
    },
    async handle_click_save() {
      const filter = this.properties.filter(arg => !arg.disabled);
      filter.push(this.uploadAt);
      this.filterdProperties = filter.map(({ key, value, mode }) => {
        return { key, value, mode };
      });
      await this.$store.dispatch("Post/createPost", this.filterdProperties);
      this.$router.push("post/requests"); //need to move after schema
    },
    clean_handler() {
      this.properties = this.properties.filter(arg => !arg.disabled);
    },
    handle_save_schema() {
      const schema_name = this.schemaName;
      const properties = this.filterdProperties;
      if (this.save)
        this.$store.dispatch("Post/createSchema", { schema_name, properties });
      this.save = true; //tbi
    }
  }
};
</script>

<style scoped>
</style>
