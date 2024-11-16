<template>
  <va-card>
    <form @submit.prevent="handleSignup">
      <va-input v-model="userName" label="Username" class="inp" required />
      <va-input v-model="customerId" label="Customer ID" class="inp" required />
      <va-input v-model="userIdentifier" label="Email" class="inp" required />
      <va-input v-model="userCredential" label="Password" type="password" class="inp" required />
      <VaButton class="ms-3" @click="handleSignup">Sign Up</VaButton>
    </form>
  </va-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      customerId: '',
      userIdentifier: '',
      userCredential: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post('/api/v1/user/session/sign-up', {
          userName: this.userName,
          customerId: this.customerId,
          userIdentifier: this.userIdentifier,
          userCredential: this.userCredential,
        });
        const authResponse = response.data.data;
        this.$emit('signupSuccess', authResponse);
      } catch (error) {
        console.error('Signup failed:', error);
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