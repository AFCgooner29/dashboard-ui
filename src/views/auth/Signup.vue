<template>
  <va-card>
    <form @submit.prevent="handleSignup">
      <va-input
        v-model="userName"
        label="Username"
        class="inp"
        required
        :error="!userName && showErrors"
        error-message="Username is required"
      />
      <va-input
        v-model="customerId"
        label="Customer ID"
        class="inp"
        required
        :error="!customerId && showErrors"
        error-message="Customer ID is required"
      />
      <va-input
        v-model="userIdentifier"
        label="Email"
        class="inp"
        required
        :error="!userIdentifier && showErrors"
        error-message="Email is required"
      />
      <va-input
        v-model="userCredential"
        label="Password"
        type="password"
        class="inp"
        required
        :error="!userCredential && showErrors"
        error-message="Password is required"
      />
      <VaButton class="ms-3" @click="handleSignup">Sign Up</VaButton>
    </form>
  </va-card>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';
const apiPrefix = process.env.VUE_APP_API_PREFIX;
const aesKey = process.env.VUE_APP_AES_KEY;
export default {
  data() {
    return {
      userName: '',
      customerId: '',
      userIdentifier: '',
      userCredential: '',
      showErrors: false, // To toggle error messages for validation
    };
  },
  methods: {
    async handleSignup() {
      this.showErrors = true;

      // Validation for required fields
      if (!this.userName || !this.customerId || !this.userIdentifier || !this.userCredential) {
        alert('Required fields are not populated.');
        return;
      }

      // Encrypting the userCredential
      const encryptedCredential = this.encryptPassword(this.userCredential);

      try {
        const response = await axios.post(apiPrefix+'api/v1/user/session/sign-up', {
          userName: this.userName,
          customerId: this.customerId,
          userIdentifier: this.userIdentifier,
          userCredential: encryptedCredential, // Send encrypted password
        });
        const authResponse = response.data.data;
        this.$emit('signupSuccess', authResponse);
        alert('Signup successful!');
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    },
    encryptPassword(password) {
      const key = CryptoJS.enc.Base64.parse(aesKey);
      const encrypted = CryptoJS.AES.encrypt(password, key);
    
      return encrypted.toString();
    }
  },
};
</script>

<style scoped>
.inp {
  padding-top: 7px;
  padding-bottom: 7px;
}
</style>