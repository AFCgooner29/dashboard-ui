<template>
  <!-- Contact Us Form (Vertically Aligned) -->
  <section class="contact-us" id="contact-us">
    <h2>Contact Us</h2>
    <VaForm ref="formRef" @submit.prevent="submitForm" class="contact-form">
      <VaInput color="#36054a" v-model="name" label="Your Name" required :error="nameError"
        error-messages="Name is required" />
      <VaInput color="#36054a" v-model="email" label="Your Email" type="email" required :error="emailError"
        error-messages="Valid email is required" />
      <VaTextarea color="#36054a" v-model="message" label="Your Message" required :error="messageError"
        error-messages="Message is required" />
      <VaButton color="#36054a" type="submit">Send Message</VaButton>
    </VaForm>
    <VaAlert v-if="successMessage" color="success">{{ successMessage }}</VaAlert>
    <VaAlert v-if="errorMessage" color="danger">{{ errorMessage }}</VaAlert>
  </section>

</template>

<script setup>
import { ref } from 'vue';

// Reactive variables for form data
const name = ref('');
const email = ref('');
const message = ref('');

// Form validation error states
const nameError = ref(false);
const emailError = ref(false);
const messageError = ref(false);

// Message alerts
const successMessage = ref('');
const errorMessage = ref('');

// Scroll to contact section
const scrollToContact = () => {
  const contactSection = document.getElementById('contact-us');
  contactSection.scrollIntoView({ behavior: 'smooth' });
};

const apiPrefix = process.env.VUE_APP_API_PREFIX;

// Form submission handler
const submitForm = async () => {
  nameError.value = !name.value;
  emailError.value = !email.value || !validateEmail(email.value);
  messageError.value = !message.value;

  if (!nameError.value && !emailError.value && !messageError.value) {
    try {
      var apiKey = 'd4b719f6-02b9-4ae1-bc0a-1b4d83eedba2';
      const response = await fetch(apiPrefix + 'auth/api/contact/submit', {
        method: 'POST',
        headers: {
          'API_KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value
        })
      });
      const data = await response.json();

      console.log(data);


      successMessage.value = 'Thank you for your message. We will get back to you shortly!';
      clearForm();
    } catch (error) {
      errorMessage.value = 'Failed to send your message. Please try again later.';
    }
  }
};

// Email validation function
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Clear the form fields after submission
const clearForm = () => {
  name.value = '';
  email.value = '';
  message.value = '';
};
</script>

<style scoped>
.contact-us {
  margin-top: 60px;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.contact-form VaButton {
  width: 100%;
}

h1,
h2 {
  color: #333;
}
</style>
