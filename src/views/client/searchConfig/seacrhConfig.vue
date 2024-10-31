<template>
    <div>
      <!-- <va-button @click="openFormDialog()">Create New Config</va-button> -->
      <va-data-table
        :items="configs"
        :columns="columns"
        @row-click="openFormDialog"
        @row-delete="deleteConfig"
      />
      <va-modal v-model="isFormDialogOpen">
        <template #title>
          {{ isEdit ? 'Edit Config' : 'Create New Config' }}
        </template>
        <form @submit.prevent="submitForm">
          <va-input v-model="formData.indexName" label="Index Name" required />
          <va-input v-model="formData.searchConfigKey" label="Search Config Key" required />
          <va-input v-model="formData.customerId" label="Customer ID" required />
  
          <h4>Search Logic Config</h4>
          <va-input v-model="formData.searchLogicConfig.templateName" label="Template Name" />
          <va-input v-model="formData.searchLogicConfig.templateBuilder" label="Template Builder" />
          <va-select
            v-model="formData.searchLogicConfig.returnFields"
            label="Return Fields"
            multiple
            :options="returnFieldsOptions"
          />
          <va-input v-model="formData.searchLogicConfig.fuzzyLowerLimit" label="Fuzzy Lower Limit" type="number" />
          <va-input v-model="formData.searchLogicConfig.fuzzyUpperLimit" label="Fuzzy Upper Limit" type="number" />
          <va-input v-model="formData.searchLogicConfig.queryTokensCountForFuzzyDisableThreshold" label="Token Count for Fuzzy Disable Threshold" type="number" />
          <va-input v-model="formData.searchLogicConfig.tokensCountForFuzzyDisableThreshold" label="Tokens Count for Fuzzy Disable Threshold" type="number" />
  
          <h4>Analyzed Fields Config</h4>
          <div v-for="(field, index) in formData.searchLogicConfig.analyzedFieldsConfig" :key="index">
            <va-input v-model="field.name" label="Field Name" />
            <va-input v-model="field.boostBaseValue" label="Boost Base Value" type="number" />
            <va-select
              v-model="field.disabledStrategyTypes"
              label="Disabled Strategy Types"
              multiple
              :options="strategyTypeOptions"
            />
            <va-select v-model="field.forcedMatchType" label="Forced Match Type" :options="matchTypeOptions" />
            <va-select v-model="field.forcedFuzzyMatchType" label="Forced Fuzzy Match Type" :options="matchTypeOptions" />
          </div>
  
          <va-button type="submit" color="primary">{{ isEdit ? 'Update' : 'Create' }}</va-button>
        </form>
      </va-modal>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import { VaButton, VaDataTable, VaModal, VaInput, VaSelect } from 'vuestic-ui';
  import apiService from '../searchConfig/mockService.js';
  
  export default {
    components: { VaButton, VaDataTable, VaModal, VaInput, VaSelect },
    setup() {
      const configs = ref([]);
      const isFormDialogOpen = ref(false);
      const isEdit = ref(false);
      const formData = reactive({
        indexName: '',
        searchConfigKey: '',
        customerId: '',
        searchLogicConfig: {
          templateName: '',
          templateBuilder: '',
          returnFields: [],
          fuzzyLowerLimit: 4,
          fuzzyUpperLimit: 8,
          queryTokensCountForFuzzyDisableThreshold: 3,
          tokensCountForFuzzyDisableThreshold: 6,
          analyzedFieldsConfig: [
            { name: '', boostBaseValue: 1000, disabledStrategyTypes: [], forcedMatchType: '', forcedFuzzyMatchType: '' },
          ],
        },
      });
  
      const columns = [
        { key: 'indexName', label: 'Index Name' },
        { key: 'searchConfigKey', label: 'Search Config Key' },
        { key: 'customerId', label: 'Customer ID' },
        { key: 'actions', label: 'Actions' },
      ];
  
      const returnFieldsOptions = ['field1', 'field2'];
      const strategyTypeOptions = ['SPAN', 'PARTIAL', 'SPAN_FUZZY', 'PARTIAL_FUZZY'];
      const matchTypeOptions = [
        'PARTIAL_EXACT',
        'PARTIAL_FUZZY_MATCH',
        'PARTIAL_PREFIX_EXACT',
        'PARTIAL_PREFIX_FUZZY_MATCH',
        'SPAN_PREFIX_FUZZY_MATCH',
        'SPAN_PREFIX_EXACT_MATCH',
        'SPAN_EXACT',
        'SPAN_FUZZY',
      ];
  
      const openFormDialog = (config = null) => {
        isEdit.value = !!config;
        if (config) Object.assign(formData, config);
        isFormDialogOpen.value = true;
      };
  
      const submitForm = async () => {
        try {
          if (isEdit.value) await apiService.updateConfig(formData);
          else await apiService.createConfig(formData);
          fetchConfigs();
        } catch (error) {
          console.error(error);
        } finally {
          isFormDialogOpen.value = false;
        }
      };
  
      const deleteConfig = async (configId) => {
        try {
          await apiService.deleteConfig(configId);
          fetchConfigs();
        } catch (error) {
          console.error(error);
        }
      };
  
      const fetchConfigs = async () => {
        configs.value = await apiService.getConfigs();
      };
  
      fetchConfigs();
  
      return {
        configs,
        columns,
        formData,
        isFormDialogOpen,
        isEdit,
        returnFieldsOptions,
        strategyTypeOptions,
        matchTypeOptions,
        openFormDialog,
        submitForm,
        deleteConfig,
      };
    },
  };
  </script>
  