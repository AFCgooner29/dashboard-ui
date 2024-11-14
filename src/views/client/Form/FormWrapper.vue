<template>
  <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchFormData" />
</template>

<script>
import axios from 'axios';
import GenericForm from '@/components/GenericForm.vue';

export default {
  components: { GenericForm },
  data() {
    return {
      mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
      formStructure: {},
      lovData: {},
      fetchUrl: "",
      fetchQueryParameters: {},
      fetchBody: {},
      fetchRequestType: "GET" // default to GET
    };
  },
  mounted() {
    this.loadFormData();
  },
  methods: {
    async loadFormData() {
      const { id } = this.$route.params;
      try {
        const response = await axios.get(`/fetch/form/meta?id=${id}`);
        const data = response.data;

        // Populate component data with the API response
        this.formStructure = data.formStructure || {};
        this.lovData = data.lovData || {};
        this.fetchUrl = data.fetchUrl || "";
        this.fetchQueryParameters = data.fetchQueryParameters || {};
        this.fetchBody = data.fetchBody || {};
        this.fetchRequestType = data.fetchRequestType || "GET";

      } catch (error) {
        console.error("Error fetching form metadata:", error);
      }
    },
    async fetchFormData() {
      try {
        let requestConfig = {
          method: this.fetchRequestType,
          url: this.fetchUrl,
          params: this.fetchQueryParameters, // For query parameters in GET requests
        };

        // Add request body for POST or PUT requests
        if (this.fetchRequestType === "POST" || this.fetchRequestType === "PUT") {
          requestConfig.data = this.fetchBody;
        }

        const response = await axios(requestConfig);
        return response.data;

      } catch (error) {
        console.error("Error fetching form data:", error);
        throw error; // Propagate error to the caller if needed
      }
    }
  },
};
</script>
