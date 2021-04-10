<template>
  <div class="info-module-edit">
    <h1 class="module-title">Company and Team information</h1>
    <div class="company-title">
      <h2 class="company-edit">Add your company name</h2>
      <input v-model="moduleData.companyName" />
    </div>
    <div class="team-title">
      <h2 class="team-edit">What team is hiring?</h2>
      <input v-model="moduleData.teamName" />
    </div>
    <div class="role-title">
      <h2 class="role-edit">What role are you hiring for?</h2>
      <input v-model="moduleData.roleName" />
    </div>
    <div class="role-intro-video">
      <h2 class="video-edit">Upload a team introduction video</h2>
      <input type="file" name="video" @change="fileChanged" />
      <button class="upload" @click="uploadVideo">Upload</button>
      <vue-core-video-player
        :src="moduleData.introVideoPath"
        v-if="moduleData.introVideoPath.length > 0"
      ></vue-core-video-player>
    </div>

    <div class="role-desctription">
      <h2 class="description-edit">Describe the day to day operation of this team</h2>
      <input v-model="moduleData.roleDescription" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoModuleEdit",
  data() {
    return {
      file: null,
    };
  },
  props: {
    moduleData: Object
  },
  methods: {
    fileChanged(event) {
      console.log("fileChanged hit!");
      this.file = event.target.files[0];
    },
    async uploadVideo() {
      try {
        const formData = new FormData();
        formData.append("video", this.file, this.file.name);
        let r1 = await axios.post("/api/videos", formData);
        // let r2 = await axios.post('/api/items', {
        //   title: this.title,
        //   path: r1.data.path
        // });
        console.log(r1.data.path);
        this.moduleData.introVideoPath = r1.data.path;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.info-module-edit {
  padding: 20px;
  border: 2px solid black;
}
</style>