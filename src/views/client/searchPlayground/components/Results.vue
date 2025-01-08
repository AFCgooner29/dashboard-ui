<template>
  <div>
    <h2>Search Results</h2>
    <div class="va-table-responsive" v-if="results && results.length">
      <table class="va-table va-table--hoverable">
        <thead>
          <tr>
            <th v-for="header in filteredHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td v-for="header in filteredHeaders" :key="header">{{ getNestedValue(result, header) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No results found.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  results: {
    type: Array,
    default: () => [],
  },
});

const EXCLUDED_KEYS = ["matchedQueries", "score"]; // List of keys to exclude

// Dynamically generate headers based on keys in the results, excluding certain keys
const headers = computed(() => {
  if (!props.results.length) return [];
  const keys = new Set();

  props.results.forEach((result) => {
    const flattened = flattenObject(result);
    Object.keys(flattened).forEach((key) => keys.add(key));
  });

  return Array.from(keys);
});

// Filter headers to exclude specified keys
const filteredHeaders = computed(() => headers.value.filter((key) => !EXCLUDED_KEYS.includes(key)));

// Helper function to get nested values
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj) || "-";
}

// Helper function to flatten nested objects
function flattenObject(obj, prefix = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {});
}
</script>

<style scoped>
.va-table-responsive {
  overflow: auto;
}
</style>
