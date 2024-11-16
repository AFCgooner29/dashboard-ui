<template>
  <va-card color="secondary" class="login-card">
    <va-tabs v-model="activeTab" stateful>
      <va-tab label="Login" />
      <va-tab label="Sign Up" />
    </va-tabs>
    <!-- Render LoginForm only if the Login tab is active -->
    <div v-if="activeTab === 0">
      <LoginForm class="panel" @loginSuccess="handleLoginSuccess" />
    </div>
    <!-- Render SignupForm only if the Sign Up tab is active -->
    <div v-if="activeTab === 1" class="panel">
      <SignupForm class="panel" @signupSuccess="handleSignupSuccess" />
    </div>
  </va-card>
</template>

<script>
import LoginForm from './Login.vue';
import SignupForm from './Signup.vue';
import axios from 'axios'; // Assuming axios is used for API calls.


export default {
  components: { LoginForm, SignupForm },
  data() {
    return {
      activeTab: 0, // Default to 'Login' tab
    };
  },
  methods: {
    handleLoginSuccess(authResponse) {
      console.log(authResponse);
      localStorage.setItem('userSession', authResponse.sessionToken);
      localStorage.setItem('userName', authResponse.userDetails.userName);
      localStorage.setItem('userRoles', authResponse.userDetails.userRoleTypes.join());

      this.fetchIIndexNames();
      this.$router.back();
      setTimeout(() => {
        window.location.reload(); // Force a page reload
      }, 100);
    },
    handleSignupSuccess(authResponse) {
      localStorage.setItem('userSession', authResponse.sessionToken);
      localStorage.setItem('userName', authResponse.userDetails.userName);
      localStorage.setItem('userRoles', authResponse.userDetails.userRoleTypes.join());

      this.fetchIIndexNames();
      this.$router.back();
      setTimeout(() => {
        window.location.reload(); // Force a page reload
      }, 100);
    },
    async fetchIIndexNames() {
      const indexNames = [];
      try {
        const apiPrefix = process.env.VUE_APP_API_PREFIX;
        const response = await axios.get(apiPrefix + 'auth/admin/manage/searchIndex', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userSession"),
          },
        });
        if (response && response.data) {
          for (const indexMapping of response.data) { // Adjust the iteration based on actual API response structure
            if (indexMapping.indexName) {
              indexNames.push(indexMapping.indexName);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch index names:', error);
      }
      localStorage.setItem('userIndexes', indexNames.join());
      return indexNames;
    },
  },
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  margin-top: 5%;
}

.panel {
  margin: auto;
  padding: 20px;
}
</style>
