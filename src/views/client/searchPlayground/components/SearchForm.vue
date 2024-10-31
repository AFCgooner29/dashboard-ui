<template>
  <VaForm ref="formRef" class="flex flex-col items-baseline gap-6" @submit.prevent="onSubmit">
    <!-- <div class="form-group">
      <VaInput v-model="apiKey" placeholder="Enter Api Key" label="API Key" requiredMark=true
        style="width: 100%; margin-top: 5px" :error="apiKeyError" error-messages="API Key is required" />
    </div> -->
    <div class="form-group">
      <VaSelect v-model="selectedIndex" :options="indexes" label="Index" placeholder="Select an option"
        style="width: 100%; margin-top: 5px" :error="selectedIndexError" error-messages="Index selection is required" />
    </div>
    <div class="form-group">
      <VaInput v-model="queryTerm" placeholder="Enter Query" label="Search Query" style="width: 100%; margin-top: 5px"
        :error="queryTermError" error-messages="Search query is required" />
    </div>
    <div class="form-group">
      <VaSelect v-model="searchableSelected" :options="options" style="width: 600px; margin-top: 5px"
        label="Searchable Fields" multiple />
    </div>
    <div class="row">
      <Filter :filters="filters" :add-filter="addFilter" :remove-filter="removeFilter" />
    </div>
    <VaButton icon-right="arrow_forward" icon-color="#ffffff50" type="submit" style="margin: 5px;">
      Search
    </VaButton>
  </VaForm>
</template>

<script setup>
import { ref } from "vue";
import Filter from "./Filters.vue";
import { useFetch } from "../../../../util/useFetch.js"

// Reactive state for form fields
const selectedIndex = ref();
const queryTerm = ref('');
const filters = ref([{ id: 1, key: "", filter: "" }]);
const searchableSelected = ref([]);
const emit = defineEmits(['search']); // You need to define the emitted event

const apiPrefix = process.env.VUE_APP_API_PREFIX;

// Constants for options
const options = ["product.name", "product.brand"];
const indexes = ["search_products"];

// Validation error states
const selectedIndexError = ref(false);
const queryTermError = ref(false);

// Functions to manage filters
const addFilter = () => {
  filters.value.push({
    id: filters.value.length + 1,
    key: "",
    filter: "",
  });
};
const removeFilter = (filter) => {
  const index = filters.value.findIndex(f => f.id === filter.id);
  if (index !== -1) {
    filters.value.splice(index, 1);
  }
};

// Form submit handler
const onSubmit = async () => {
  // Reset error states
  var apiKey = 'd4b719f6-02b9-4ae1-bc0a-1b4d83eedba2';
  if (!apiKey || apiKey == undefined) {
    alert("Please set API key shared with you in mail")
  }
  selectedIndexError.value = !selectedIndex.value;
  queryTermError.value = !queryTerm.value;

  // If validation passes, make the API call
  if (!selectedIndexError.value && !queryTermError.value) {
    try {
      const requestObj = new Request(
        apiPrefix+`auth/api/v1/search`,
        {
          method: "POST",
          headers: {
            "API_KEY": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "indexName": selectedIndex.value,
            "queryTerm": queryTerm.value,
            "searchableFields": searchableSelected.value,
            "size": 50,
            "filters": [
              
            ]
          }),
        }
      );
      const response = await useFetch(requestObj);
      if (response) {
        console.log(response.data)
        emit('search', response.data); // Emit the search results back to the parent component
      }
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  } else {
    console.log("Validation failed");
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
