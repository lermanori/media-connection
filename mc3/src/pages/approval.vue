<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h6 class="q-mt-xl q-mb-none">
          <u>{{$route.params.postid}}</u>
        </h6>
      </div>
    </div>
    <q-select filled v-model="model" v-if="loaded" :options="InputOptions" label="Commits" />
    <div class="container q-ma-xl" v-if="model!=null">
      <div class="row justify-center q-my-md">commit description: {{model.description}}</div>
      <div class="row justify-center">
        <q-card class="my-card">
          <q-img class="app-img q-mx-auto" ratio="1" :src="baseURL.localBaseUrl+model.value" />
        </q-card>
      </div>
    </div>
    <br />
    <template v-for="(entries,index) in data.properties">
      <div class="row wrap justify-center" :key="index">
        <div class="col-12" :key="index">
          <p
            :key="index"
          >{{index}}.{{Object.fromEntries(Object.keys(data.properties[index]).map(arg=> [arg,data.properties[index][arg]]))}}</p>
        </div>
      </div>
    </template>
    <div class="row wrap justify-center">
      <div class="q-mx-sm q-my-lg">
        <q-btn class="q-mr-xl" round icon="check" color="green" @click="()=>openPopup('yes')"></q-btn>
        <q-btn class="q-mr-xl" round icon="close" color="red" @click="()=>openPopup('no')"></q-btn>
        <q-dialog v-model="prompt">
          <q-card style="min-width: 400px">
            <q-card-section>
              <div class="text-h6">{{popUpText}}</div>
            </q-card-section>

            <q-card-section>
              <q-input dense v-model="message" autogrow filled @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn fab icon="close" v-close-popup />
              <q-btn fab icon="check" v-close-popup @click="handlePrompt" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="q-mx-sm q-my-lg"></div>
    </div>
  </div>
</template>
<script>
import PostConverter from "../mixins/PostConverter.js";
import baseURL from "../baseUrl";
export default {
  data() {
    return {
      model: null,
      inputOptions: [
        {
          label: "Google",
          value: "Google",
          description: "Search engine",
          category: "1"
        },
        {
          label: "Facebook",
          value: "Facebook",
          description: "Social media",
          category: "1"
        }
      ],
      data: {},
      loaded: false,
      message: "",
      prompt: false,
      done: false,
      baseURL,
      approved: "no"
    };
  },
  computed: {
    InputOptions() {
      let commitsToValues = this.data.commits
        .map((x, idx) => {
          return {
            label: `${idx}. ${x.user.email}`,
            value: x.path2,
            description: x.commitMessage
          };
        })
        .filter(x => x.value != undefined);
      console.log(commitsToValues);
      return commitsToValues;
    },
    popUpText() {
      return this.approved == "yes"
        ? "Do uo want to add any thing"
        : "Please enter reason fo denail";
    }
  },
  methods: {
    openPopup(arg) {
      this.approved = arg;
      this.prompt = true;
    },
    handlePrompt() {
      if (this.approved == "yes") {
        let postId = this.$route.params.postid;
        let message = this.message;
        let value = this.model.value;
        this.$store
          .dispatch("Post/approvePost", { postId, message, value })
          .then(data => {
            this.$router.push("/grid");
          });
      } else {
        let postId = this.$route.params.postid;
        let message = this.message;
        this.$store
          .dispatch("Post/disapprovePost", { postId, message })
          .then(data => {
            this.$router.push("/grid");
          });
      }
    },
    async convertIdToPost(id) {
      const res = PostConverter.convertIdToPost(id);
      return res;
    }
  },
  mounted() {
    this.convertIdToPost(this.$route.params.postid).then(({ data }) => {
      this.data = data;
      this.loaded = true;
    });
  }
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

* >>> div.tui-image-editor-header-logo {
  display: none;
}
</style>