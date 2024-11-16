<template>
  <section class="filter-container">
    <h2>Filters</h2>
    <div v-for="filter in filters" :key="filter.id" class="input-filters">
      <!-- Dropdown for selecting filter key -->
      <VaSelect 
        v-model="filter.key" 
        :options="filterableFields" 
        placeholder="Select Key" 
        label="Key" 
        style="margin: 5px; width: 200px;" 
      />
      <!-- Input for filter value -->
      <VaInput 
        v-model="filter.value" 
        placeholder="Enter Value" 
        label="Value" 
        style="margin: 5px; width: 200px;" 
      />
      <!-- Button to remove filter -->
      <VaButton 
        @click="removeFilter(filter)" 
        color="danger" 
        style="margin: 23px 5px 0px 5px;" 
      >
        Remove
      </VaButton>
    </div>
    <!-- Button to add a new filter -->
    <div>
      <VaButton @click="addFilter" color="success" style="margin: 5px">
        Add Filter
      </VaButton>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  filters: Array, // Array of filter objects
  addFilter: Function, // Function to add a new filter
  removeFilter: Function, // Function to remove a filter
  filterableFields: Array // Array of filterable fields to populate dropdown
});
</script>

<style scoped>
.filter-container {
  display: inline-flex;
  flex-direction: column;
}
.input-filters {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
