<template>
  <div class="launchpad">
    <div class="company-info" v-if="company">
      <h2 class="company-name">
        <div class="logged-in">Logged in as: {{ company.companyName }}</div>
        <button @click="logout" class="pure-button pure-button-primary">
          Logout
        </button>
      </h2>
    </div>
    <div
      class="application-box"
      v-for="application in this.applications"
      :key="application.id"
    >
      <p class="application-name">
        Application: {{ application.applicationName }}
      </p>
      <div class="edit-delete-buttons">
        <button class="edit" @click="editApplication(application._id)">
          Edit
        </button>
        <button class="delete" @click="deleteApplication(application._id)">
          Delete
        </button>
      </div>
      <div class="link-box">
        <h2 class="copy-link-words">Share this link with job applicants!</h2>
        <p class="shareable-link">{{ getSharableLink(application._id) }}</p>
      </div>
    </div>
    <div class="new-application">
      <button class="create-application" @click="createApplication">
        + Application
      </button>
    </div>
  </div>
</template>

<style scoped>
.application-box {
  border: 2px solid black;
  width: fit-content;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.link-box {
  width: fit-content;
  padding: 20px;
  background-color: #86c232;
  margin: 0 auto;
  margin-bottom: 20px;
}

.edit-delete-buttons {
  margin-bottom: 20px;
}

.application-name {
  font-size: 30px;
}
</style>

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
    getSharableLink(applicationID) {
      var path = this.$router.resolve({ name: "Application" }).href;
      var fullUrl =
        window.location.origin +
        path +
        `?companyID=${this.company._id}&applicationID=${applicationID}`;
      return fullUrl;
    },
    createApplication() {
      this.$root.$data.applicationToEditID = "";
      this.$router.push({ name: "ApplicationEdit" });
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
      this.$router.push({ name: "ApplicationEdit" });
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