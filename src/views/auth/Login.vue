<template>
  <va-card>
    <form @submit.prevent="handleSubmit">
      <!-- Username Field -->
      <va-input v-model="userIdentifier" label="Username" required class="inp" :error="errors.userIdentifier"
        error-message="Username is required" />
      <!-- Password Field -->
      <va-input v-model="userCredential" label="Password" type="password" required class="inp"
        :error="errors.userCredential" error-message="Password is required" />
      <!-- Login Button -->
      <va-button class="ms-3" @click="handleLogin">Login</va-button>

      <!-- Credential Change Section -->
      <div v-if="showCredentialChange">
        <va-input v-model="newCredential" label="New Credential" type="password" required class="inp"
          :error="errors.newCredential" error-message="New Credential is required" />
        <va-button class="ms-3" @click="handleCredentialChange">Submit Change</va-button>
      </div>
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
      userIdentifier: '',
      userCredential: '',
      newCredential: '',
      showCredentialChange: false,
      errors: {
        userIdentifier: false,
        userCredential: false,
        newCredential: false,
      },
    };
  },
  methods: {
    validateFields() {
      this.errors.userIdentifier = !this.userIdentifier;
      this.errors.userCredential = !this.userCredential;

      if (this.showCredentialChange) {
        this.errors.newCredential = !this.newCredential;
      }

      // Return true if no errors
      return !this.errors.userIdentifier && !this.errors.userCredential && (!this.showCredentialChange || !this.errors.newCredential);
    },
    encryptPassword(password) {
      const key = CryptoJS.enc.Base64.parse(aesKey);
      const encrypted = CryptoJS.AES.encrypt(password, key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      return encrypted.toString();
    },
    async handleLogin() {
      if (!this.validateFields()) {
        alert('Required fields are not populated.');
        return;
      }

      try {

        // Encrypt the password before sending it
        const encryptedPassword = this.encryptPassword(this.userCredential);

        const response = await axios.post(apiPrefix + 'api/v1/user/session/login', {
          userIdentifier: this.userIdentifier,
          userCredential: encryptedPassword,
        });

        const authResponse = response.data.data;
        console.log(authResponse);
        this.$emit('loginSuccess', authResponse);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async handleCredentialChange() {
      if (!this.validateFields()) {
        return;
      }

      try {
        const apiPrefix = process.env.VUE_APP_API_PREFIX;

        // Encrypt the credentials before sending
        const { encryptedPassword: currentPasswordEncrypted, iv: ivCurrent } = this.encryptPassword(this.userCredential);
        const { encryptedPassword: newPasswordEncrypted, iv: ivNew } = this.encryptPassword(this.newCredential);

        await axios.post(apiPrefix + 'api/v1/user/session/credential-change', {
          userIdentifier: this.userIdentifier,
          userCredential: currentPasswordEncrypted,
          newCredential: newPasswordEncrypted,
          ivCurrent,
          ivNew,
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