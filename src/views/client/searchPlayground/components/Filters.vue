<template>
  <section class="filter-container">
    <h2>Filters</h2>
    <div v-for="filter in filters" :key="filter" class="input-filters">
      <VaInput v-model="filter.key" placeholder="Enter Key" label="Key" style="margin: 5px" />
      <VaInput v-model="filter.value" placeholder="Enter Value" label="Value" style="margin: 5px" />
      <VaButton @click="removeFilter(filter)" color="danger" style="margin: 23px 5px 0px 5px;" > Remove </VaButton>
    </div>
    <div>
      <VaButton @click="addFilter" color="success" style="margin: 5px" > Add Filter </VaButton>
    </div>
  </section>
</template>

<script setup>
const props = defineProps([ 'filters', 'addFilter', 'removeFilter' ]);
</script>

<style>
.filter-container {
  display: inline-flex;
  flex-direction: column;
}

</style>
