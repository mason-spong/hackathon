<template>
  <div class="launchpad">
    <h1>HI</h1>
    <div
      class="application-box"
      v-for="application in this.applications"
      :key="application.id"
    >
      <p>{{ application.applicationName }}</p>
      <button class="edit" @click="editApplication(application._id)">Edit</button>
      <button class="delete" @click="deleteApplication(application._id)">Delete</button>
      <p class="shareable-link" >{{getSharableLink(application._id)}}</p>
    </div>
    <div class="new-application">
      <button class="create-application" @click="createApplication">+ Application</button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "axios";

export default {
  name: "Launchpad",
  computed: {
    company() {
      return this.$root.$data.company;
    },
  },
  async created() {
    try {
      let response = await axios.get("/api/companies");
      this.$root.$data.company = response.data.company;
      this.getApplications();
    } catch (error) {
      console.log("not logged in for Launchpad");
      this.$root.$data.company = null;
      this.$router.push({ name: "Home" });
    }
  },
  data() {
    return {
      applications: [],
    };
  },
  methods: {
    getSharableLink(applicationID) {
      var path = this.$router.resolve({name: 'Application'}).href; 
      var fullUrl = window.location.origin + path + `?companyID=${this.company._id}&applicationID=${applicationID}`;
      return fullUrl;

    },
    createApplication() {
      this.$root.$data.applicationToEditID = "";
      this.$router.push({ name: "ApplicationEdit"});
    },
    async deleteApplication(applicationID) {
      try {
        await axios.delete(
          `/api/companies/${this.company._id}/applications/${applicationID}`
        );
        await this.getApplications();
      } catch (error) {
        console.log(error);
      }
    },
    editApplication(applicationID) {
      this.$root.$data.applicationToEditID = applicationID;
      this.$router.push({ name: "ApplicationEdit"});
    },
    async getApplications() {
      try {
        const response = await axios.get(
          `/api/companies/${this.company._id}/applications`
        );
        this.applications = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>