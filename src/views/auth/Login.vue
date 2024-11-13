<template>
    <va-card>
      <form @submit.prevent="handleSubmit">
        <va-input
          v-model="userIdentifier"
          label="Username"
          required
          class="inp"
        />
        <va-input
          v-model="userCredential"
          label="Password"
          type="password"
          required
          class="inp"
        />
        <VaButton class="ms-3" @click="handleLogin">Login</VaButton>
        <!-- <va-button @click="handleLogin" label="Login" /> -->
        <!-- <VaButton class="ms-3" @click="toggleCredentialChange">Change Credential</VaButton> -->
        <!-- <va-button @click="toggleCredentialChange" label="Change Credential" outline /> -->
        
        <div v-if="showCredentialChange">
          <va-input
            v-model="newCredential"
            label="New Credential"
            type="password"
            required
            class="inp"
          />
          <VaButton class="ms-3" @click="handleCredentialChange">Submit Change</VaButton>
          <!-- <va-button @click="handleCredentialChange" label="Submit Change" /> -->
        </div>
      </form>
    </va-card>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userIdentifier: '',
        userCredential: '',
        newCredential: '',
        showCredentialChange: false,
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('/api/v1/user/session/login', {
            userIdentifier: this.userIdentifier,
            userCredential: this.userCredential,
          });
          const { sessionToken } = response.data.data;
          this.$emit('loginSuccess', sessionToken);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    //   toggleCredentialChange() {
    //     this.showCredentialChange = !this.showCredentialChange;
    //   },
      async handleCredentialChange() {
        try {
          await axios.post('/api/v1/user/session/credential-change', {
            userIdentifier: this.userIdentifier,
            userCredential: this.userCredential,
            newCredential: this.newCredential,
          });
          this.showCredentialChange = false;
          this.newCredential = '';
          alert('Credential successfully changed.');
        } catch (error) {
          console.error('Credential change failed:', error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .inp {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  </style>