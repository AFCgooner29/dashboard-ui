<template>
  <div class="landing-page">
    <!-- Header Section -->
    <header class="header">
      <!-- <VaButton size="large" color="primary" @click="scrollToContact">Contact Us</VaButton> -->
      <h1>Empower Your Business with AI-Driven Solutions</h1>
    </header>

    <!-- Product Section (Horizontal Cards) -->
    <VaRow class="product-section" align="stretch" justify="center" gutter="16">
      <VaCol cols="12" md="6">
        <VaCard class="product-card">
          <h3>AI Chatbot – Intelligent Customer Support</h3>
          <p>Our AI Chatbot uses your business domain data to derive meaningful responses for customer queries, improving efficiency and satisfaction.</p>
          <ul>
            <li>Automated Customer Support</li>
            <li>Domain-Specific Intelligence</li>
            <li>24/7 Availability</li>
          </ul>
        </VaCard>
      </VaCol>

      <VaCol cols="12" md="6">
        <VaCard class="product-card">
          <h3>AI-Powered Search & Discovery</h3>
          <p>Enhance product discovery within your app and increase add-to-cart rates and cart values with our AI-powered search engine.</p>
          <ul>
            <li>Smart, intuitive search</li>
            <li>Personalized product suggestions</li>
            <li>Seamless integration with your app</li>
          </ul>
        </VaCard>
      </VaCol>
    </VaRow>

    <!-- Contact Us Form (Vertically Aligned) -->
    <section class="contact-us" id="contact-us">
      <h2>Contact Us</h2>
      <VaForm ref="formRef" @submit.prevent="submitForm" class="contact-form">
        <VaInput v-model="name" label="Your Name" required :error="nameError" error-messages="Name is required" />
        <VaInput v-model="email" label="Your Email" type="email" required :error="emailError" error-messages="Valid email is required" />
        <VaTextarea v-model="message" label="Your Message" required :error="messageError" error-messages="Message is required" />
        <VaButton type="submit" color="primary">Send Message</VaButton>
      </VaForm>
      <VaAlert v-if="successMessage" color="success">{{ successMessage }}</VaAlert>
      <VaAlert v-if="errorMessage" color="danger">{{ errorMessage }}</VaAlert>
    </section>

    <!-- Footer Section -->
    <VaSection color="primary" class="footer-section">
      <p>&copy; 2024 My AI Solutions. All Rights Reserved.</p>
    </VaSection>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

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

// Form submission handler
const submitForm = async () => {
  nameError.value = !name.value;
  emailError.value = !email.value || !validateEmail(email.value);
  messageError.value = !message.value;

  if (!nameError.value && !emailError.value && !messageError.value) {
    try {
      const response = await axios.post('/api/contact', {
        name: name.value,
        email: email.value,
        message: message.value,
      });

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
.landing-page {
  padding: 20px;
}

.header {
  text-align: center;
  height: 200px;
  margin-bottom: 40px;
}

.product-section {
  margin: 40px 0;
}

.product-card {
  margin-top: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card h3 {
  margin-bottom: 15px;
  color: #333;
}

.product-card ul {
  list-style-type: disc;
  padding-left: 20px;
}

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

h1, h2 {
  color: #333;
}

.footer-section {
  text-align: center;
  padding: 20px 0;
  color: white;
}
</style>
