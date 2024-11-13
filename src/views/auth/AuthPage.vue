<template>
  <va-card color="secondary" class="login-card">
    <va-tabs v-model="activeTab" stateful>
      <va-tab label="Login" />
      <va-tab label="Sign Up" />
    </va-tabs>
    <!-- Render LoginForm only if the Login tab is active -->
    <div v-if="activeTab === 0">
      <LoginForm  class="panel" @loginSuccess="handleLoginSuccess" />
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

export default {
  components: { LoginForm, SignupForm },
  data() {
    return {
      activeTab: 0, // Default to 'Login' tab
    };
  },
  methods: {
    handleLoginSuccess(sessionToken) {
      localStorage.setItem('sessionToken', sessionToken);
      // Redirect or update UI state as needed
    },
    handleSignupSuccess(sessionToken) {
      localStorage.setItem('sessionToken', sessionToken);
      // Redirect or update UI state as needed
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
