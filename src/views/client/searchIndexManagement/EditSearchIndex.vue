<template>
  <div>
    <h2>Add Search Index</h2>
    <va-form @submit.prevent="addSearchIndex">
      <va-input v-model="form.indexName" label="Index Name" required />
      <va-select v-model="form.searchIndexType" :options="indexTypes" label="Index Type" required />
      <va-input v-model="form.customerId" label="Customer ID" required />
      <va-input v-model="form.searchClientId" label="Search Client ID" required />
      <va-checkbox v-model="form.enabled" label="Enabled" />
      <div v-for="(field, index) in form.configuredFields" :key="index">
        <h4>Configured Field {{ index + 1 }}</h4>
        <va-input v-model="field.fieldName" label="Field Name" required />
        <va-select v-model="field.fieldType" :options="fieldTypes" label="Field Type" required />
        <va-select v-model="field.fieldDataType" :options="dataTypes" label="Field Data Type" required />
        <va-input v-model="field.importance" label="Importance" type="number" required />
        <va-checkbox v-model="field.isFuzzySearchEnabled" label="Fuzzy Search Enabled" />

        <!-- Nested Fields -->
        <div v-for="(nestedField, nestedIndex) in field.nestedFields" :key="nestedIndex">
          <va-input v-model="nestedField.fieldName" label="Nested Field Name" />
          <va-select v-model="nestedField.fieldType" :options="fieldTypes" label="Nested Field Type" />
        </div>

        <va-button color="secondary" @click="addNestedField(index)">Add Nested Field</va-button>
      </div>

      <va-button color="secondary" @click="addConfiguredField">Add Configured Field</va-button>
      <va-button color="primary" type="submit">Add Index</va-button>
    </va-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        indexName: '',
        searchIndexType: '',
        customerId: '',
        searchClientId: '',
        enabled: true,
        configuredFields: [],
      },
      indexTypes: ['STANDARD', 'ANALYZED'],
      fieldTypes: ['TEXT', 'NUMBER', 'DATE'],
      dataTypes: ['LONG', 'INT', 'STRING', 'BOOLEAN'],
    };
  },
  methods: {
    addConfiguredField() {
      this.form.configuredFields.push({
        fieldName: '',
        fieldType: '',
        fieldDataType: '',
        enabled: true,
        importance: 1,
        isFuzzySearchEnabled: false,
        nestedFields: [],
      });
    },
    addNestedField(index) {
      this.form.configuredFields[index].nestedFields.push({
        fieldName: '',
        fieldType: '',
      });
    },
    addSearchIndex() {
      axios.post('/auth/admin/manage/searchIndex', this.form)
        .then(() => this.$router.push({ name: 'SearchIndexList' }))
        .catch(error => console.error("Error adding search index:", error));
    }
  }
};
</script>
<style scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>