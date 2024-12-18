<template>
  <div class="container mt-5">
    <h1>Search Playground</h1>
    <SearchForm @search="handleSearch" />
    <div id="alertContainer" class="mt-3"></div>
    <DebugMeta :debug-meta="debugMeta" :stored-to-display-mapping="storedToDisplayMapping"/>
    <Results :results="results" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchForm from './components/SearchForm.vue';
import Results from "./components/Results.vue";
import DebugMeta from "./components/DebugMeta.vue";
import reportConfig from '../reportConfigs.json';


const isModalVisible = ref(false);
const results = ref([]); // Initialize the results array
const debugMeta = ref();
const storedToDisplayMapping = ref(reportConfig.RULE_REPORT.storedToDisplayMapping)

// Check for API key in localStorage on page load
onMounted(() => {
  const storedApiKey = localStorage.getItem('api-key');
  if (!storedApiKey) {
    isModalVisible.value = true;
  }
});

// Handle search response
const handleSearch = (response) => {
  console.log('Search response:', response);
  results.value = response.hits || []; // Update the results with the hits from the response
  debugMeta.value = response.debugMeta.debugMeta;
};
</script>

<style>
.outlined {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
</style>
