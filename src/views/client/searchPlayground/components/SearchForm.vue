<template>
  <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
    <div class="form-group">
      <VaSelect
        v-model="slectedIndex"
        :options="indexes"
        label="Index"
        placeholder="Select an option"
        style="width: 100%; margin-top: 5px"
        
      />
    </div>
    <div class="form-group">
      <VaInput
        v-model="queryTerm"
        placeholder="Enter Query"
        label="Search Query"
        preset="solid"
        style="width: 100%; margin-top: 5px"
      />
    </div>
    <div class="form-group">
      <VaSelect
        v-model="searchableSelected"
        :options="options"
        style="width: 600px; margin-top: 5px"
        label="Searchable Fields"
        multiple
      />
    </div>
    <div class="row">
      <Filter
        :filters="filters"
        :add-filter="addFilter"
        :remove-filter="removeFilter"
      />
    </div>
    <VaButton
      icon-right="arrow_forward"
      icon-color="#ffffff50"
      type="submit"
      style="margin: 5px;"
    >
      Search
    </VaButton>
  </VaForm>
</template>

<script setup>
import { ref } from "vue";
import Filter from "./Filters.vue";

// Reactive
const slectedIndex = ref();
const filters = ref([
  {
    id: 1,
    key: "",
    filter: "",
  },
]);
const searchableSelected = ref([]);

// Constants
const options = ["Search Products", "Search Brands"];
const indexes = ["Search Products"];

// Functions
const addFilter = () => {
  filters.value.push({
    id: filters.value.length + 1,
    key: "",
    filter: "",
  });
};
const removeFilter = (filter) => {
  try {
    const index = filters.value.findIndex(f => f.id === filter.id);
    if (index !== -1) {
      filters.value.splice(index, 1);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
