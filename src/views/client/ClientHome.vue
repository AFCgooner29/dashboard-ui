<template>
  <div>
    <ClientNavbar />
    <router-view />

    <!-- API Key Modal -->
    <ApiKeyModal :show="isModalVisible" @api-key-added="handleApiKeyAdded" @close="handleModalClose" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ClientNavbar from './components/ClientNavbar.vue';
import ApiKeyModal from '../../components/ApiKeyModal.vue';

const isModalVisible = ref(false);

// Function to check for API key in localStorage
const checkApiKey = () => {
  const storedApiKey = localStorage.getItem('api-key');
  if (!storedApiKey) {
    isModalVisible.value = true;
  } else {
    isModalVisible.value = false;
  }
};

// Set up interval to check API key every 5 seconds
onMounted(() => {
  checkApiKey(); // Initial check on page load

  const intervalId = setInterval(() => {
    checkApiKey();
  }, 10000);

  // Clean up interval on component unmount
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

// Handle the event when an API key is added
const handleApiKeyAdded = (newApiKey) => {
  console.log('API key added:', newApiKey);
  localStorage.setItem('api-key', newApiKey); // Save the new API key
  isModalVisible.value = false;
};

// Handle the modal close event without adding an API key
const handleModalClose = () => {
  isModalVisible.value = false; // Close the modal, but it will reopen if API key is not added
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
