<template>
  <div class="container text-center">
    <br />
    <h6 class="q-mb-none desktop-only">Load any base picture before picking commits</h6>
    <q-card style="max-width:1000px;" class="q-mx-auto q-my-xl">
      <q-select
        filled
        @input="handle_inputSelect"
        v-model="model"
        v-if="loaded"
        :options="InputOptions"
        label="Commits"
      />
      <div v-if="model!=null">
        commit description: {{model.description}}
        <!--<q-img :src="baseURL.localBaseUrl+model.value" />-->
      </div>
      <app-properties :arr="data.properties" />
      <div class="row wrap justify-center desktop-only">
        <div class="imageEditorApp q-lg-mx-sm q-xs-md-none">
          <tui-image-editor
            ref="tuiImageEditor"
            :include-ui="useDefaultUI"
            :options="options"
            @addText="onAddText"
            @objectMoved="onObjectMoved"
          ></tui-image-editor>
        </div>
      </div>
      <div class="row wrap justify-center desktop-hide">
        <div class="q-lg-mx-sm q-xs-md-none">
          <q-btn class="q-mt-sm" color="cyan" icon="add" @click="click_handle" />
          <q-card class="q-mt-md">
            <q-img
              :src="ImageFile!= null? ImageFile : 'https://placeimg.com/500/300/nature'"
              :ratio="1"
              :style="{width:'200px',height:'200px'}"
              :key="ImageFile"
            />
          </q-card>
          <input type="file" ref="fileInput" v-show="false" @input="handle_input" />
        </div>
      </div>

      <div class="row wrap justify-center">
        <div class="q-mx-sm q-my-lg">
          <q-btn class="q-mx-sm" icon="exit_to_app" color="indigo" @click="$router.push('/grid')" />
          <q-btn class="q-mx-sm" icon="save" color="indigo">
            <q-popup-proxy v-model="opened">
              <q-banner>
                <template v-slot:avatar>
                  <q-icon name="save" color="primary" />
                </template>
                Enter Commit Message
                <template v-slot:action>
                  <q-checkbox outline label="done" v-model="done" class="q-mr-xl" />

                  <q-input outline label="Commit Message" v-model="commitMessage" />
                  <q-btn outline color="indigo" icon="send" @click="sumbit_photo_handle" />
                </template>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
    </q-card>
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
import properties from "../components/properties";
import axiosConfig from "../axiosConfig";
export default {
  components: {
    "tui-image-editor": ImageEditor,
    "app-properties": properties
  },
  data() {
    return {
      axiosConfig,
      model: null,
      uploadedImage: false,
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
      baseURL,
      imageFile: null,
      mobile: false
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
    ImageFile() {
      return this.imageFile;
    }
  },
  methods: {
    async handle_input(arg) {
      console.log(arg.target.files[0]);
      const toBase64 = file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      this.imageFile = await toBase64(arg.target.files[0]);
      this.mobile = true;
    },
    handle_inputSelect() {
      this.loadImageFromUrl(this.model.value);
      console.log(this.model.value);
      this.imageFile = this.baseURL.localBaseUrl + this.model.value;
    },
    click_handle() {
      this.$refs.fileInput.click();
    },
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
      let image64 = this.mobile
        ? this.imageFile
        : this.$refs.tuiImageEditor.invoke("toDataURL");
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