<template>
  <div class="application-edit">
    <div id="nav">
      <router-link to="/launchpad">Return to Launchpad</router-link>
    </div>
    <div class="company-info" v-if="company">
      <h2 class="company-name">{{ company.companyName }}</h2>
      <button class="logout" @click="logout">Logout</button>
    </div>

    <div class="naming-info">
      <h2 class="app-name">Application name:</h2>
      <div class="input-wrap">
        <input class="large-input name-input" v-model="applicationName" />
      </div>
    </div>
    <info-module-edit class="info" :moduleData="infoModuleEdit" />
    <component
      class="component"
      v-for="comp in this.modules"
      :key="comp.id"
      v-bind:is="comp.component"
      :moduleData="comp"
    ></component>
    <button @click="addFreeResponseModuleEdit" class="pure-button">Add free response</button>
    <button @click="addMultipleChoiceModuleEdit" class="pure-button">Add Multiple Choice</button>
    <button @click="addCodingQuestionEdit" class="pure-button">Add Coding Question</button>
    <button @click="addFileUploadEdit" class="pure-button">Add File Upload Question</button>
    <button @click="submit" class="pure-button">{{ submitText }}</button>
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
  background-color: hsl(85, 59%, 48%);
  padding: .5rem;
  border-radius: 8px;
  font-size: 2.5rem;
  border: 1px;
  box-shadow: 0px 0px 2px 0px;
  transition: .3s;
  margin: .5rem;
}

.pure-button1, .logout {
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

.edit:hover, .delete:hover, .create-application:hover, .pure-button1:hover, .pure-button:hover, .logout:hover {
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
    },
  },
  async created() {
    try {
      let response = await axios.get("/api/companies");
      this.$root.$data.company = response.data.company;
      if (this.$root.$data.applicationToEditID.length > 0) {
        console.log("found to edit ID");
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
        let response = await axios.get(
          `/api/companies/${this.company._id}/applications/${this.$root.$data.applicationToEditID}`
        );
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
          ifEditThenApplicationIDIs: this.$root.$data.applicationToEditID,
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

<style scoped>
.company-info {
  display: grid;
  grid-template: auto / 1fr 1fr;
  justify-items: center;
  align-items: center;
}
.company-name,
.logout {
  width: fit-content;
  height: fit-content;
}
.name-input {
  margin: 0 auto;
}

.naming-info {
  background-color: #86c232;
  margin-bottom: 20px;
}

.input-wrap {
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  padding-bottom: 10px;
}

.component {
  margin-bottom: 20px;
}

.info {
  margin-bottom: 20px;
}
</style>