<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h6 class="q-mt-xl q-mb-none">
          <u>{{$route.params.postid}}</u>
        </h6>
      </div>
    </div>
    <q-select
      filled
      @input="loadImageFromUrl(model.value)"
      v-model="model"
      v-if="loaded"
      :options="InputOptions"
      label="Commits"
    />
    <div v-if="model!=null">
      commit description: {{model.description}}
      <!--<q-img :src="baseURL.localBaseUrl+model.value" />-->
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
      <div class="imageEditorApp q-mx-sm">
        <tui-image-editor
          ref="tuiImageEditor"
          :include-ui="useDefaultUI"
          :options="options"
          @addText="onAddText"
          @objectMoved="onObjectMoved"
        ></tui-image-editor>
      </div>
    </div>
    <div class="row wrap justify-center">
      <div class="q-mx-sm q-my-lg">
        <q-btn
          class="q-mr-xl"
          round
          icon="exit_to_app"
          color="indigo"
          @click="$router.push('/grid')"
        />
        <q-btn class="q-mr-xl" round icon="save" color="indigo">
          <q-popup-proxy v-model="opened">
            <q-banner>
              <template v-slot:avatar>
                <q-icon name="save" color="primary" />
              </template>
              Enter Commit Message
              <template v-slot:action>
                <q-checkbox outline round label="done" v-model="done" class="q-mr-xl" />

                <q-input outline round label="Commit Message" v-model="commitMessage" />
                <q-btn outline round color="indigo" icon="send" @click="sumbit_photo_handle" />
              </template>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
// To use the default UI, the svg files for the icons is required.
import { ImageEditor } from "@toast-ui/vue-image-editor";
// copy example white-theme.js to project and export it
import "tui-image-editor/dist/tui-image-editor.min.css";
import "tui-image-editor/dist/svg/icon-a.svg";
import "tui-image-editor/dist/svg/icon-b.svg";
import "tui-image-editor/dist/svg/icon-c.svg";
import "tui-image-editor/dist/svg/icon-d.svg";

import PostConverter from "../mixins/PostConverter.js";
import baseURL from "../baseUrl";
export default {
  components: {
    "tui-image-editor": ImageEditor
  },
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
      useDefaultUI: true,
      options: {
        includeUI: {
          initMenu: "filter"
          //theme: whiteTheme
        },
        loadImage: {
          path: "",
          name: "something"
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500
      },
      data: {},
      loaded: false,
      commitMessage: "",
      opened: false,
      done: false,
      baseURL
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
    }
  },
  methods: {
    onAddText(res) {
      console.group("addText");
      console.log("Client Position : ", res.clientPosition);
      console.log("Origin Position : ", res.originPosition);
      console.groupEnd();
    },
    onObjectMoved(res) {
      console.group("objectMoved");
      console.log("Left : ", res.left);
      console.log("Top : ", res.top);
      console.groupEnd();
    },
    sumbit_photo_handle() {
      let image64 = this.$refs.tuiImageEditor.invoke("toDataURL");
      let commitMessage = this.commitMessage;
      let postId = this.$route.params.postid;
      let done = this.done;
      let imageData = { image64, commitMessage, postId, done };
      this.$store
        .dispatch("Post/addImageToPost", imageData)
        .then(() => {
          this.commitMessage = "";
          this.opened = false;
        })
        .catch(err => console.log(err));
    },
    loadCommitData() {},

    async convertIdToPost(id) {
      const res = PostConverter.convertIdToPost(id);
      return res;
    },
    selectImage: function(event) {
      const file = event.target.files[0];
      this.$refs.tuiImageEditor.invoke("loadImageFromFile", file).then(x => {
        let image64 = this.$refs.tuiImageEditor.invoke("toDataURL");
      });
      this.$refs.tuiImageEditor;
    },
    loadImageFromUrl(url) {
      this.$refs.tuiImageEditor
        .invoke(
          "loadImageFromURL",
          baseURL.localBaseUrl + url,
          "My sample image"
        )
        .then(x => {
          this.$refs.tuiImageEditor.invoke("startDrawingMode", "NORMAL", {
            width: 10,
            color: "rgba(255, 0, 0, 0.5)"
          });
        });
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
.imageEditorApp {
  width: 90vw;
  height: 70vh;
}
.svg_ic-menu {
  background-color: white;
}
* >>> div.tui-image-editor-header-logo {
  display: none;
}
</style>