<template>
  <VaForm ref="formRef" class="flex flex-col items-baseline gap-6" @submit.prevent="onSubmit">
    <div class="form-group">
      <VaSelect v-model="selectedIndex" :options="indexes" label="Index" placeholder="Select an option"
        style="width: 100%; margin-top: 5px" :error="selectedIndexError" error-messages="Index selection is required"
        @update:modelValue="onIndexChange" />
    </div>
    <div class="form-group">
      <VaInput v-model="queryTerm" placeholder="Enter Query" label="Search Query" style="width: 100%; margin-top: 5px"
        :error="queryTermError" error-messages="Search query is required" />
    </div>
    <div class="form-group">
      <VaSelect v-model="searchableSelected" :options="searchableFields" style="width: 600px; margin-top: 5px"
        label="Searchable Fields" multiple />
    </div>
    <div class="row">
      <Filter :filters="filters" :filterable-fields="filtersKeyOptions" :add-filter="addFilter"
        :remove-filter="removeFilter" />
    </div>
    <VaButton icon-right="arrow_forward" icon-color="#ffffff50" type="submit" style="margin: 5px;">
      Search
    </VaButton>
  </VaForm>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Filter from "./Filters.vue";
import { useFetch } from "../../../../util/useFetch.js";

const selectedIndex = ref(null);
const queryTerm = ref('');
const filters = ref([]);
const filtersKeyOptions = ref([]);
const searchableSelected = ref([]);
const indexes = ref([]);
const searchableFields = ref([]);

const selectedIndexError = ref(false);
const queryTermError = ref(false);

const apiPrefix = process.env.VUE_APP_API_PREFIX;

const emit = defineEmits(['search']);

async function fetchIndexes() {
  try {
    const response = await axios.get(`${apiPrefix}auth/admin/manage/searchIndex`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userSession")}`,
      },
    });

    indexes.value = response.data.data.map(index => index.indexName);
    processAndStoreSearchableFields(response.data.data);
  } catch (error) {
    console.error('Failed to fetch indexes:', error);
  }
}

function processAndStoreSearchableFields(data) {
  const indexFieldData = data.map(index => ({
    indexName: index.indexName,
    searchableFields: index.configuredFields
      .filter(field => field.fieldType === "SEARCHABLE" && field.enabled && !field.internal)
      .map(field => field.fieldName),
    filterableFields: index.configuredFields
      .filter(field => (field.fieldType === "SEARCHABLE" || field.fieldType === "FILTERABLE") && field.enabled && !field.internal)
      .map(field => field.fieldName),
  }));

  localStorage.setItem("indexFieldData", JSON.stringify(indexFieldData));
}

function onIndexChange(newIndex) {
  const indexFieldData = JSON.parse(localStorage.getItem("indexFieldData"));
  const selectedIndexData = indexFieldData.find(index => index.indexName === newIndex);

  if (selectedIndexData) {
    searchableFields.value = selectedIndexData.searchableFields || [];
    filtersKeyOptions.value = selectedIndexData.filterableFields || [];
    // filters.value = (selectedIndexData.filterableFields || []).map(field => ({
    //   id: Date.now() + Math.random(),
    //   key: field,
    //   filter: "",
    // }));
  }
}

const addFilter = () => {
  filters.value.push({ id: Date.now(), key: "", filter: "" });
};

const removeFilter = (filter) => {
  const index = filters.value.findIndex(f => f.id === filter.id);
  if (index !== -1) {
    filters.value.splice(index, 1);
  }
};

const onSubmit = async () => {
  console.log("on Submit");
  selectedIndexError.value = !selectedIndex.value;
  queryTermError.value = !queryTerm.value;

  if (!selectedIndexError.value && !queryTermError.value) {
    try {
      const response = await useFetch(new Request(
        `${apiPrefix}auth/api/v1/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userSession')}`,
            'Content-Type': 'application/json',
            'X-DEBUG': true,
          },
          body: JSON.stringify({
            indexName: selectedIndex.value,
            queryTerm: queryTerm.value,
            searchableFields: searchableSelected.value,
            size: 50,
            filters: filters.value.map(filter => ({ key: filter.key, value: filter.filter })),
          }),
        }
      ));

      emit('search', response.data);
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  }
};

fetchIndexes();
</script>
