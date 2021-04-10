<template>
  <div class="launchpad">
    <h2 class="company-name" v-if="company">
      Logged in as: {{ company.companyName }}
      <button @click="logout" class="pure-button pure-button-primary">
        Logout
      </button>
    </h2>
    <div
      class="application-box"
      v-for="application in this.applications"
      :key="application.id"
    >
      <p>{{ application.applicationName }}</p>
      <button class="edit" @click="editApplication(application._id)">
        Edit
      </button>
      <button class="delete" @click="deleteApplication(application._id)">
        Delete
      </button>
      <div class="link-box">
        <h2>Copy this link and paste it in the application</h2>
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
  * {
    box-sizing: border-box;
  }

  .launchpad {
    background-color: white;
    color: #222629;
    display: flex;
    font-size: 3rem;
  }

  .company-name {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6B6E70;
    padding-left: 3rem;
  }

  .link-box {
    background-color: #86C232;
    color: #222629;
    padding: 3rem;
    border-radius: 8px;
  }


  
  .application-box {
    font-size: 1.5rem;
    padding: 1rem;
    margin: 0 1rem;
  }

.edit {
  margin: 1rem;
}

.delete {
  margin: 1rem;
}

.create-application {
  margin: 1rem;
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
}
  .edit, .delete, .create-application {
    justify-self: center;
    background-color: #86C232;
    color: #222629;
    padding: 1rem;
    border-radius: 8px;
    border: 1px;
    font-size: 2.5rem;
    box-shadow: 0px 0px 2px 0px;
    transition: .3s;
  }

  .edit:hover, .delete:hover, .create-application:hover, .pure-button:hover {
    box-shadow: 0px 10px 8px 0px grey;
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