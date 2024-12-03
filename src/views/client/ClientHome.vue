<template>
  <div>
    <ClientNavbar />
    <router-view class="sub-view" />

    <!-- API Key Modal -->
    <ApiKeyModal :show="isModalVisible" @api-key-added="handleApiKeyAdded" @close="handleModalClose" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ClientNavbar from './components/ClientNavbar.vue';

const indexNames = ref([]);

async function fetchIndexNames() {
  try {
    const apiPrefix = import.meta.env.VITE_API_PREFIX; // Adjust based on your Vue 3 environment variables
    const response = await axios.get(`${apiPrefix}/auth/admin/manage/searchIndex`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userSession")}`,
      },
    });

    if (response && response.data) {
      indexNames.value = response.data
        .filter((indexMapping) => indexMapping.indexName) // Ensure indexName exists
        .map((indexMapping) => indexMapping.indexName); // Extract indexName
    }
  } catch (error) {
    console.error('Failed to fetch index names:', error);
  }

  // Save the list of index names in localStorage
  localStorage.setItem('userIndexes', indexNames.value.join());
}

// Fetch index names on component mount
onMounted(fetchIndexNames);
</script>


<style scoped>
/* Add your custom styles here */
.sub-view {
  padding: 2%;
}
</style>
