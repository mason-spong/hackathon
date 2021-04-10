<template>
  <div class="application-edit">
    <div id="nav">
      <router-link to="/launchpad">Launchpad</router-link>
    </div>
    <h2 v-if="company">
      Logged in as: {{ company.companyName }}
      <button @click="logout" class="pure-button pure-button-primary">
        Logout
      </button>
    </h2>
    <h2>Application name:</h2>
    <input v-model="applicationName" />
    <info-module-edit :moduleData="infoModuleEdit" />
    <component
      v-for="comp in this.modules"
      :key="comp.id"
      v-bind:is="comp.component"
      :moduleData="comp"
    ></component>
    <button @click="addFreeResponseModuleEdit">Add free response</button>
    <button @click="addMultipleChoiceModuleEdit">Add Multiple Choice</button>
    <button @click="addCodingQuestionEdit">Add Coding Question</button>
    <button @click="addFileUploadEdit">Add File Upload Question</button>
    <button @click="submit">{{submitText}}</button>
  </div>
</template>

<script>
import axios from "axios";
// import FreeResponseQuestion from "@/components/FreeResponseQuestion.vue";
import InfoModuleEdit from "../components/InfoModuleEdit.vue";
import FreeResponseQuestionEdit from "../components/FreeResponseQuestionEdit.vue";
import MultipleChoiceQuestionEdit from "../components/MultipleChoiceQuestionEdit.vue";
import CodingQuestionEdit from "../components/CodingQuestionEdit.vue";
import FileUploadEdit from "../components/FileUploadEdit.vue";
export default {
  name: "ApplicationEdit",
  components: {
    InfoModuleEdit,
    FreeResponseQuestionEdit,
    MultipleChoiceQuestionEdit,
    CodingQuestionEdit,
    FileUploadEdit,
  },
  data() {
    return {
      applicationName: "",
      modules: [],
      infoModuleEdit: {
        introVideoPath: "",
        companyName: "",
        teamName: "",
        roleName: "",
        roleDescription: "",
      },
    };
  },
  computed: {
    company() {
      return this.$root.$data.company;
    },
    submitText() {
      if (this.$root.$data.applicationToEditID.length > 0) {
        return "Save Changes";
      }
      return "Publish";
    }
  },
  async created() {
    try {
      let response = await axios.get("/api/companies");
      this.$root.$data.company = response.data.company;
      if (this.$root.$data.applicationToEditID.length > 0) {
        console.log('found to edit ID');
        await this.setApplicationData();
      }
    } catch (error) {
      console.log("not logged in for application edit");
      this.$root.$data.company = null;
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    async setApplicationData() {
      try {
        let response = await axios.get(`/api/companies/${this.company._id}/applications/${this.$root.$data.applicationToEditID}`);
        console.log(response);
        this.applicationName = response.data.applicationName;
        this.modules = response.data.modules;
        this.infoModuleEdit = response.data.infoModule;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/companies");
        this.$root.$data.company = null;
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.$root.$data.company = null;
        this.$router.push({ name: "Home" });
      }
    },
    async submit() {
      try {
        await axios.post(`/api/companies/${this.company._id}/applications`, {
          applicationName: this.applicationName,
          infoModule: this.infoModuleEdit,
          modules: this.modules,
          ifEditThenApplicationIDIs: this.$root.$data.applicationToEditID
        });
        this.$router.push({ name: "Launchpad" });
      } catch (error) {
        console.log(error);
      }
    },
    addFreeResponseModuleEdit() {
      this.modules.push({
        component: "FreeResponseQuestionEdit",
        questionDescription: "",
      });
    },
    addMultipleChoiceModuleEdit() {
      this.modules.push({
        component: "MultipleChoiceQuestionEdit",
        questionDescription: "",
        correctIndex: null,
        choices: [
          {
            question: "",
          },
          {
            question: "",
          },
          {
            question: "",
          },
          {
            question: "",
          },
        ],
      });
    },
    addCodingQuestionEdit() {
      this.modules.push({
        component: "CodingQuestionEdit",
        questionDescription: "",
      });
    },
    addFileUploadEdit() {
      this.modules.push({
        component: "FileUploadEdit",
        questionDescription: "",
      });
    },
  },
};
</script>