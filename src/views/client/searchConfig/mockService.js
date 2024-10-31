// src/services/apiService.js
const mockConfigs = [
    {
      id: '1',
      indexName: 'products_index',
      searchConfigKey: 'default_config',
      customerId: 'cust_123',
      searchLogicConfig: {
        templateName: 'default_template',
        templateBuilder: 'default_builder',
        returnFields: ['productId', 'productName', 'productPrice'],
        sortFieldConfigs: [],
        fuzzyLowerLimit: 4,
        fuzzyUpperLimit: 8,
        queryTokensCountForFuzzyDisableThreshold: 3,
        tokensCountForFuzzyDisableThreshold: 6,
        analyzedFieldsConfig: [
          {
            name: 'productName',
            boostBaseValue: 1000,
            disabledStrategyTypes: ['PARTIAL'],
            forcedMatchType: 'PARTIAL_EXACT',
            forcedFuzzyMatchType: 'PARTIAL_FUZZY_MATCH',
          },
        ],
      },
    },
  ];
  
  export default {
    getConfigs() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...mockConfigs]);
        }, 500);
      });
    },
  
    createConfig(config) {
      return new Promise((resolve) => {
        setTimeout(() => {
          config.id = String(mockConfigs.length + 1);
          mockConfigs.push(config);
          resolve(config);
        }, 500);
      });
    },
  
    updateConfig(updatedConfig) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockConfigs.findIndex((config) => config.id === updatedConfig.id);
          if (index !== -1) {
            mockConfigs[index] = updatedConfig;
          }
          resolve(updatedConfig);
        }, 500);
      });
    },
  
    deleteConfig(configId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockConfigs.findIndex((config) => config.id === configId);
          if (index !== -1) {
            mockConfigs.splice(index, 1);
          }
          resolve(configId);
        }, 500);
      });
    },
  };
  