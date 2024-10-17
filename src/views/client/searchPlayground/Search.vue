<template>
  <div class="container mt-5">
    <h1>Search Playground</h1>
    <SearchForm @search="handleSearch" />
    <div id="alertContainer" class="mt-3"></div>
    <Results :results="results" />
  </div>
  <!-- API Key Modal -->
  <ApiKeyModal :show="isModalVisible" @api-key-added="handleApiKeyAdded" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchForm from './components/SearchForm.vue';
import Results from "./components/Results.vue";


const isModalVisible = ref(false);
const results = ref([]); // Initialize the results array

// Check for API key in localStorage on page load
onMounted(() => {
  const storedApiKey = localStorage.getItem('api-key');
  if (!storedApiKey) {
    isModalVisible.value = true;
  }
});

// Handle the event when an API key is added
const handleApiKeyAdded = (newApiKey) => {
  console.log('API key added:', newApiKey);
  localStorage.setItem('api-key', newApiKey); // Store the API key
  isModalVisible.value = false;
};

// Handle search response
const handleSearch = (response) => {
  console.log('Search response:', response);
  results.value = response.hits || []; // Update the results with the hits from the response
};
</script>

<style>
.outlined {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
</style>
