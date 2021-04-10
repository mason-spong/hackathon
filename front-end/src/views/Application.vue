<template>
  <div class="application">
    <h2 v-if="company">
      Logged in as: {{ company.companyName }}
      <button @click="logout" class="pure-button pure-button-primary">
        Logout
      </button>
    </h2>
    <info-module-edit :moduleData="infoModuleEdit" />
    <free-response-question />
    <button @click="submit">Publish Application</button>
  </div>
</template>

<script>
import axios from "axios";
import FreeResponseQuestion from "@/components/FreeResponseQuestion.vue";
import InfoModuleEdit from "../components/InfoModuleEdit.vue";
export default {
  name: "Application",
  components: {
    FreeResponseQuestion,
    InfoModuleEdit,
  },
  data() {
    return {
      infoModuleEdit: {
          introVideoPath: "",
          companyName: "",
          teamName: "",
          roleName: "",
          roleDescription: ""
        }
    }
  },
  computed: {
    company() {
      return this.$root.$data.company;
    },
  },
  async created() {
    try {
      let response = await axios.get("/api/companies");
      this.$root.$data.company = response.data.company;
    } catch (error) {
      this.$root.$data.company = null;
    }
  },
  methods: {
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
          infoModule: this.infoModuleEdit,
        });
        
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>