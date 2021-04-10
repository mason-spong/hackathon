<template>
  <div class="application">
    <div v-if="this.app != null">
      <info-module :moduleData="this.app.infoModule" />
      <component
        v-for="comp in this.app.modules"
        :key="comp.id"
        v-bind:is="comp.component"
        :moduleData="comp"
      ></component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InfoModule from "../components/InfoModule.vue";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion.vue";
import CodingQuestion from "../components/CodingQuestion.vue";
import FileUpload from "../components/FileUpload.vue";
import FreeResponseQuestion from "../components/FreeResponseQuestion.vue";

export default {
  components: { InfoModule,
  MultipleChoiceQuestion,
  CodingQuestion,
  FileUpload,
  FreeResponseQuestion },
  name: "Application",
  data() {
    return {
      app: null,
    };
  },
  created() {
    this.getApplication();
  },
  methods: {
    async getApplication() {
      try {
        const response = await axios.get(
          `/api/companies/${this.$route.query.companyID}/applications/${this.$route.query.applicationID}`
        );
        console.log(response.data);
        response.data.modules = response.data.modules.map((mod) => {
          mod.component = mod.component.slice(0, mod.component.length - 4);
          return mod;
        });
        this.app = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>