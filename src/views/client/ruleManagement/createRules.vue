<template>
    <va-card>
      <h2>Create Rule</h2>
  
      <va-form @submit.prevent="createRule">
        <!-- Rule Details -->
        <va-input v-model="rule.indexName" label="Index Name" required />
        <va-input v-model="rule.customerId" label="Customer ID" required />
        <va-switch v-model="rule.enabled" label="Enabled" />
  
        <!-- Context Section -->
        <h3>Rule Context</h3>
        <div v-for="(context, index) in rule.context" :key="'context-' + index" class="form-row">
          <va-input v-model="context.key" label="Key" placeholder="Enter key" required />
          <va-input v-model="context.value" label="Value" placeholder="Enter value" required />
          <VaIcon name="delete" color="danger" size="large" @click="removeContext(index)" />
        </div>
        <VaIcon class="mb-3" name="add_circle" color="primary" @click="addContext"/>
  
        <!-- Rule Conditions Section -->
        <h3>Rule Conditions</h3>
        <div v-for="(condition, index) in rule.ruleConditions" :key="'condition-' + index" class="form-row">
          <va-select v-model="condition.operator" :options="conditionOperators" placeholder="Operator" label="Rule Condition Operator" required />
          <va-input v-model="condition.value" label="Value" required />
          <VaIcon name="delete" color="danger" size="large" @click="removeCondition(index)" />
        </div>
        <VaIcon class="mb-3" name="add_circle" color="primary" @click="addCondition" />
  
        <!-- Consequences Section -->
        <h3>Rule Consequences</h3>
        <div v-for="(consequence, index) in rule.consequences" :key="'consequence-' + index" class="form-row">
          <va-input v-model="consequence.attributeName" label="Attribute Name" required />
          <va-select v-model="consequence.consequenceType" :options="consequenceTypes" placeholder="Consequence Type" label="Consequence Type" required />
          <va-input v-model="consequence.attributeValue" label="Attribute Value" required />
          <VaIcon name="delete" color="danger" size="large" @click="removeConsequence(index)" />
        </div>
        <VaIcon class="mb-3" name="add_circle" color="primary" @click="addConsequence" />
  
        <!-- Submit Button -->
        <va-button class="mt-3" type="submit" color="primary">Create Rule</va-button>
      </va-form>
    </va-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rule: {
          ruleId: '',
          indexName: '',
          customerId: '',
          enabled: false,
          context: [],
          ruleConditions: [],
          consequences: []
        },
        conditionOperators: [
          { text: 'Starts With', value: 'STARTS_WITH' },
          { text: 'Is', value: 'IS' }
        ],
        consequenceTypes: [
          { text: 'Boost With', value: 'BOOST_WITH' },
          { text: 'Boost Then', value: 'BOOST_THEN' },
          { text: 'Filter', value: 'FILTER' },
          { text: 'Hide', value: 'HIDE' },
          { text: 'Bury With', value: 'BURY_WITH' },
          { text: 'Bury Then', value: 'BURY_THEN' }
        ]
      };
    },
    methods: {
      addContext() {
        this.rule.context.push({ key: '', value: '' });
      },
      removeContext(index) {
        this.rule.context.splice(index, 1);
      },
      addCondition() {
        this.rule.ruleConditions.push({ operator: '', value: '' });
      },
      removeCondition(index) {
        this.rule.ruleConditions.splice(index, 1);
      },
      addConsequence() {
        this.rule.consequences.push({ attributeName: '', consequenceType: '', attributeValue: '' });
      },
      removeConsequence(index) {
        this.rule.consequences.splice(index, 1);
      },
      createRule() {
        // Call the API to create the rule with this.rule data
        console.log('Creating rule with data:', this.rule);
        // TODO: Implement API call logic
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
  