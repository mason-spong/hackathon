<template>
  <div class="info-module">
    <div class="company-title">
      <h2 class="company-edit">{{this.moduleData.companyName}}</h2>
    </div>
    <div class="team-title">
      <h2 class="team-edit">{{moduleData.teamName}}</h2>
    </div>
    <div class="role-title">
      <h2 class="role-edit">{{moduleData.roleName}}</h2>
    </div>
    <div class="role-intro-video">

      <vue-core-video-player
        :src="moduleData.introVideoPath"
        v-if="moduleData.introVideoPath.length > 0"
      ></vue-core-video-player>
    </div>

    <div class="role-description">
      <h2 class="description-edit">{{moduleData.roleDescription}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoModule",
  props: {
    moduleData: Object
  },
  created() {
    console.log(this.moduleData);
  }

};
</script>

<style scoped>

</style>