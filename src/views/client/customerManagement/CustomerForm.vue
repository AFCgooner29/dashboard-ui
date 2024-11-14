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
        header: 'Cusomer Form',
        fields: [
          {
            name: 'customerId',
            label: 'Customer Id',
            type: 'view',
            disabled: true,
          },
          {
            name: 'name',
            label: 'Customer Name',
            type: 'input'
          },
          {
            name: 'customerAddress',
            label: 'Customer Address',
            type: 'textarea'
          },
          {
            name: 'subscriptionTypeId',
            label: 'Customer Subscription Type',
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
            "customerId": "123",
            "name": "Dukaan",
            "customerAddress": "Ludhiana",
            "subscriptionTypeId": "1234",
            "enabled": true,
          };

          // Simulating a 5-second delay before resolving the data
          resolve(data);
        }, 5000);
      });
    }
  },
};
</script>