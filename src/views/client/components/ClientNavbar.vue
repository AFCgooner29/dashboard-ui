<template>
  <VaNavbar color="#36054a" class="mb-0">
    <template #left>
        <VaButton class="mr-6 mb-2" color="#36054a"><RouterLink :to="{ name: 'landing' }" style="color:white; text-decoration:none;">Igolia</RouterLink></VaButton>
    </template>
    <template #right>
      <VaNavbarItem>
        <VaButton class="mr-6 mb-2" color ="#36054a"><RouterLink :to="{ name: 'chat' }" style="color:white; text-decoration:none;">AI Assistant</RouterLink></VaButton>
      </VaNavbarItem>
      <!-- <VaNavbarItem>
        <VaButton class="mr-6 mb-2"><RouterLink :to="{ name: 'document' }" style="color:white; text-decoration:none;">Doc Builder</RouterLink></VaButton>
      </VaNavbarItem> -->
      <!-- <VaNavbarItem>
        <VaButton class="mr-6 mb-2" ><RouterLink :to="{ name: 'clientdashboard' }" style="color:white; text-decoration:none;">Dashboard</RouterLink></VaButton>
      </VaNavbarItem> -->
      <VaNavbarItem>
        <VaButton class="mr-6 mb-2" color="#36054a" ><RouterLink :to="{ name: 'searchPlayground' }" style="color:white; text-decoration:none;">Search Playground</RouterLink></VaButton>
      </VaNavbarItem>
      <!-- <VaNavbarItem>
        <VaButton class="mr-6 mb-2" ><RouterLink :to="{ name: 'clientsettings' }" style="color:white; text-decoration:none;">Settings</RouterLink></VaButton>
      </VaNavbarItem> -->
      <!-- <VaNavbarItem>
        <VaButton class="mr-6 mb-2" ><RouterLink :to="{ name: 'rulesManagement' }" style="color:white; text-decoration:none;">Rules management</RouterLink></VaButton>
      </VaNavbarItem> -->
      <!-- <VaNavbarItem>
        <VaButton class="mr-6 mb-2" color="#36054a" ><RouterLink :to="{ name: 'searchConfig' }" style="color:white; text-decoration:none;">Search Configuration</RouterLink></VaButton>
      </VaNavbarItem> -->
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
</script>


<style scoped>
</style>