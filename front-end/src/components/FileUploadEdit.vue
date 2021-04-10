<template>
  <div class="file-upload-edit module-wrap">
    <div class="module-content">
      <div class="file-upload">
        <h2>Describe what type of file will be uploaded</h2>
        <textarea placeholder="Please upload..." class="large-textarea" v-model="moduleData.questionDescription" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileUploadEdit",
  props: {
    moduleData: Object,
  },
};
</script>