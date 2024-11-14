<template>
  <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchRuleData" />
</template>

<script>
import GenericForm from '@/components/GenericForm.vue';

export default {
  components: { GenericForm },
  data() {
    return {
      mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
      formStructure: {
        header: 'Search Config Form',
        fields: [
          {
            name: 'indexName',
            label: 'Index Name',
            type: 'input'
          },
          {
            name: 'searchConfigKey',
            label: 'Config Key',
            type: 'input'
          },
          {
            name: 'customerId',
            label: 'Customer Id',
            type: 'input'
          },
          {
            name: 'enabled',
            label: 'Enabled',
            type: 'boolean'
          },
        ],
      }
    };
  },
  methods: {
    deleteRule(rule) {
      // handle delete API call
      this.rules = this.rules.filter(r => r.ruleId !== rule.ruleId);
    },
    fetchRuleData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            indexName: "test",
            searchConfigKey: "abc",
            customerId: "234"
          };

          // Simulating a 5-second delay before resolving the data
          resolve(data);
        }, 5000);
      });
    }
  },
};
</script>