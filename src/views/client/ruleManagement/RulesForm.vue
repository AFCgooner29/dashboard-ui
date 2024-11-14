<template>
  <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchRuleData" />
</template>

<script>
import GenericForm from '@/components/GenericForm.vue';
// import RuleDetailsModal from '@/components/RuleDetailsModal.vue';

const consequenceTypes = [
  { text: 'Boost With', value: 'BOOST_WITH' },
  { text: 'Boost Then', value: 'BOOST_THEN' },
  { text: 'Filter', value: 'FILTER' },
  { text: 'Hide', value: 'HIDE' },
  { text: 'Bury With', value: 'BURY_WITH' },
  { text: 'Bury Then', value: 'BURY_THEN' }
];

const ruleConditionOperators = [
{ text: 'Starts With', value: 'STARTS_WITH' },
  { text: 'Is', value: 'IS' }
]

export default {
  components: { GenericForm },
  data() {
    return {
      mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
      formStructure: {
        header: 'Add Rule',
        fields: [
          {
            name: 'ruleId',
            label: 'Rule Id',
            type: 'view',
            disabled: true,
          },
          {
            name: 'indexName',
            label: 'Index Name',
            type: 'input'
          },
          {
            name: 'indexName',
            label: 'Customer',
            type: 'input'
          },
          {
            name: 'enabled',
            label: 'Enabled',
            type: 'boolean'
          },
          {
            name: 'context',
            label: 'Rule Context',
            type: 'multi-entry',
            entryLabel: 'Rule Context',
            nestedEnabled: false,
            subFields: [
              { name: 'key', label: 'Key', type: 'input', required: true },
              { name: 'value', label: 'Value', type: 'input', required: true },
            ]
          },
          {
            name: 'ruleConditions',
            label: 'Rule Conditions',
            type: 'multi-entry',
            entryLabel: 'Rule Conditions',
            nestedEnabled: false,
            subFields: [
              { name: 'operator', label: 'Operator', type: 'select', required: true, options:ruleConditionOperators },
              { name: 'value', label: 'Value', type: 'input', required: true },
            ]
          },
          {
            name: 'consequences',
            label: 'Rule Consequences',
            type: 'multi-entry',
            entryLabel: 'Rule Consequences',
            nestedEnabled: false,
            subFields: [
              { name: 'attributeName', label: 'Attribute Name', type: 'input', required: true },
              { name: 'consequenceType', label: 'Type', type: 'select', required: true, options:consequenceTypes },
              { name: 'attributeValue', label: 'Attribute Value', type: 'input', required: true },
            ]
          }
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
            ruleId: "123",
            indexName: "search_products",
            customerId: "12345",
            enabled: true,
            context: [
              {
                key: "cityId",
                value: "Bangalore"
              },
              {
                key: "bloo",
                value: "haa"
              }
            ],
            ruleConditions: [
              {
                operator: "STARTS_WITH",
                value: "milk"
              },
              {
                operator: "IS",
                value: "milk"
              }
            ],
            consequences: [
              {
                attributeName: "categoryId",
                consequenceType: "BOOST_WITH",
                attributeValue: "1234"
              },
              {
                attributeName: "categoryId",
                consequenceType: "BOOST_WITH",
                attributeValue: "1234"
              }
            ]
          };

          // Simulating a 5-second delay before resolving the data
          resolve(data);
        }, 5000);
      });
    }
  },
};
</script>