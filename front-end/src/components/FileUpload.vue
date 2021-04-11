<template>
  <div class="file-upload module-wrap">
    <div class="module-content">
      <div class="file-upload">
        <h2 class="description">{{ moduleData.questionDescription }}</h2>
        <input type="file" name="file" @change="fileChanged" />
        <p v-if="isUploaded">Uploaded!</p>
        <button v-else class="upload" @click="uploadFile">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileUpload",
  props: {
    moduleData: Object,
  },
  data() {
    return {
      file: null,
      isUploaded: false,
    };
  },
  methods: {
    fileChanged(event) {
      console.log("fileChanged hit!");
      this.isUploaded = false;
      this.file = event.target.files[0];
    },
    async uploadFile() {
      try {
        const formData = new FormData();
        formData.append("file", this.file, this.file.name);
        let r1 = await axios.post("/api/files", formData);
        console.log(r1.data.path);
        this.moduleData.filePath = r1.data.path;
        this.isUploaded = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>