<template>
  <div class="file-upload-edit">
    <div class="file-upload">
      <h2>Describe what type of file will be uploaded</h2>
      <input v-model="moduleData.questionDescription" />
      
    </div>
  </div>
</template>

<script>

export default {
  name: "FileUploadEdit",
  props: {
    moduleData: Object
  },
  
};
</script>