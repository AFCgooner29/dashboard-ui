<template>
  <div>
    <h2>Search Results</h2>
    <div class="va-table-responsive" v-if="results && results.length">
      <table class="va-table va-table--hoverable">
        <thead>
          <tr>
            <th>Object Id</th>
            <th>Product Name</th>
            <th>Product Brand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.objectId">
            <td>{{ result.objectId }}</td>
            <td>{{ result.product.name }}</td>
            <td>{{ result.product.brand }} </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No results found.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  results: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
/* Add your styles here */
.va-table-responsive {
  overflow: auto;
}
</style>
