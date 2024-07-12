<template>
  <div class="container mt-5">
    <h1>Search Playground</h1>
    <SearchForm @search="handleSearch" />
    <div id="alertContainer" class="mt-3"></div>
    <Results :results="results" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchForm from './components/SearchForm.vue';
import Results from "./components/Results.vue";

const results = ref();
const handleSearch = (response) => {
  // Handle search response
  console.log(response);
};
</script>

<style>
.outlined {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
</style>
