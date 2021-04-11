<template>
  <div class="application">
    <div v-if="this.app != null">
      <info-module class="info-mod" :moduleData="this.app.infoModule" />
      <component
        v-for="comp in this.app.modules"
        :key="comp.id"
        v-bind:is="comp.component"
        :moduleData="comp"
      ></component>
    </div>
    <button @click="submit" class="pure-button1">Submit</button>
  </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
  }

#nav {
  font-size: 2rem;
}

h2 {
  font-size: 4rem;
}

.companyName {
  font-size: 5rem;
  color: #86C232;
}

.pure-button {
  justify-self: center;
  background-color: #86C232;
  position: absolute;
  top: 15px;
  padding: .5rem;
  border-radius: 8px;
  font-size: 2.5rem;
  border: 1px;
  box-shadow: 0px 0px 2px 0px;
  transition: .3s;
}

.pure-button1 {
  justify-self: center;
  background-color: #86C232;
  color: #222629;
  padding: .5rem;
  border: 1px;
  border-radius: 8px;
  font-size: 2rem;
  margin: .5rem;
  box-shadow: 0px 0px 2px 0px;
  transition: .3s;
  margin: 3rem;
  padding: 1rem;
}

.info-mod {
  border: 2px solid black;
  margin-bottom: 20px;
}

.edit:hover, .delete:hover, .create-application:hover, .pure-button1:hover {
    box-shadow: 0px 10px 8px 0px grey;
  }
/*
textarea,
input {
  border-radius: 8px;
  padding: 6px;
}*/

</style>

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
    submit() {
      this.$router.push({ name: "ThankYou" });
    },
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