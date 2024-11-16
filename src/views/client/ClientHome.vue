<template>
  <div>
    <ClientNavbar />
    <router-view class="sub-view" />

    <!-- API Key Modal -->
    <ApiKeyModal :show="isModalVisible" @api-key-added="handleApiKeyAdded" @close="handleModalClose" />
  </div>
</template>

<script setup>
import ClientNavbar from './components/ClientNavbar.vue';
</script>

<style scoped>
/* Add your custom styles here */
.sub-view {
  padding: 2%;
}
</style>
