<template>
  <GenericForm 
    :formStructure="formStructure" 
    :mode="mode" 
    :fetchModelData="fetchModelData" 
    :saveModelData="saveModelData" 
  />
</template>

<script>
import GenericForm from '@/components/GenericForm.vue';
import formConfigs from '../formConfigs.json'; // Import form configurations

export default {
  components: { GenericForm },
  data() {
    return {
      mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
      formStructure: formConfigs.RULE_FORM, // Load the form configuration
    };
  },
  methods: {
    async fetchModelData() {
      try {
        const apiPrefix = process.env.VUE_APP_API_PREFIX;
        const response = await fetch(`${apiPrefix}auth/admin/manage/rule/${this.$route.params.ruleId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userSession')}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async saveModelData(data) {
      try {
        const apiPrefix = process.env.VUE_APP_API_PREFIX;
        const response = await fetch(`${apiPrefix}auth/admin/manage/rule`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userSession')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to save customer data');
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};
</script>
