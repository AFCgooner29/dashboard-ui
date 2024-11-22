<template>
    <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchModelData"
        :saveModelData="saveModelData" :updateModelData="updateModelData" :postSubmitRoute="formStructure.postSubmitRoute" />
  </template>
  
  <script>
  import GenericForm from '@/components/GenericForm.vue';
  import formConfigs from '../formConfigs.json'; // Import form configurations
  
  const reverseSelectFields = (data, formStructure, valueToTextMap) => {
    // Iterate over formStructure.fields correctly
    for (const field of formStructure.fields) {
        // Check if the field type is 'select'
        if (field.type === 'select') {
            console.log(field);
            // Check if the field name exists in data and is in the valueToTextMap
            if (data[field.name] && valueToTextMap[data[field.name]]) {
                data[field.name] = {
                    text: valueToTextMap[data[field.name]],
                    value: data[field.name]
                };
            } else {
                // If not in map, just keep the value as is
                data[field.name] = {
                    text: data[field.name],
                    value: data[field.name]
                };
            }
        } else if (field.type === "multi-entry" && data[field.name]) {
            // Handle multi-entry fields (where data[field.name] is an array of objects)
            for (const entry of data[field.name]) {
                // Iterate over each entry in the array of objects for multi-entry fields
                for (const subField of field.subFields) {
                    if (subField.type === "select" && entry[subField.name]) {
                        console.log(subField);
                        const value = entry[subField.name];
                        if (valueToTextMap[value]) {
                            entry[subField.name] = {
                                text: valueToTextMap[value],
                                value: value
                            };
                        } else {
                            entry[subField.name] = {
                                text: value,
                                value: value
                            };
                        }
                    }
                }
            }
        }
    }
  
    return data;
  };
  
  
  export default {
    components: { GenericForm },
    data() {
        return {
            mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
            formStructure: this.getFormStructure(), // Load the form configuration
        };
    },
    methods: {
        getFormStructure() {
          var formStructure = formConfigs.SYNONYM_FORM; // Encapsulated logic to fetch form structure
          var indexNames = localStorage.getItem('userIndexes').split(",");
          for (let i = 0; i < formStructure.fields.length; i++) {
            if (formStructure.fields[i].name === 'indexName') {
                formStructure.fields[i].type = 'select';
              formStructure.fields[i].options = indexNames;
              break;
            }
          }
          return formStructure;
        },
        async fetchModelData() {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                const response = await fetch(`${apiPrefix}auth/admin/manage/synonyms/get/${this.$route.params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userSession')}`,
                        'Content-Type': 'application/json',
                    },
                });

                var jsonData = await response.json();
                if (!response.ok) {
                    this.showMessage(jsonData && jsonData.message || 'Failed to fetch customer data', 'error');
                    console.error('Failed to fetch customer data');
                }
                if (jsonData.data && jsonData.data.replacements) {
                    jsonData.data.replacements = jsonData.data.replacements.join();
                }
                jsonData = reverseSelectFields(jsonData.data, formConfigs.SYNONYM_FORM, formConfigs.SYNONYM_FORM.lovReverseMap);
                return jsonData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async saveModelData(data) {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                if (data && data.replacements) {
                    data.replacements = data.replacements.split(",");
                }
                const response = await fetch(`${apiPrefix}auth/admin/manage/synonyms`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userSession')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                var responseData = await response.json();
                if (!responseData || !response.ok) {
                    this.showMessage(responseData && responseData.message ? responseData.message : 'Failed to save customer data', 'error');
                    console.error(responseData && responseData.message ? responseData.message : 'Failed to save customer data');
                } else {
                    this.showMessage(responseData && responseData.message ? responseData.message : 'Operation success', 'success');
                }
                return responseData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async updateModelData(data) {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                if (data && data.replacements) {
                    data.replacements = data.replacements.split(",");
                }
                const response = await fetch(`${apiPrefix}auth/admin/manage/synonyms/${this.$route.params.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userSession')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                var responseData = await response.json();
                if (!responseData || !response.ok) {
                    this.showMessage(responseData && responseData.message ? responseData.message : 'Failed to update customer data', 'error');
                    console.error(responseData && responseData.message ? responseData.message : 'Failed to update customer data');
                } else {
                    this.showMessage(responseData && responseData.message ? responseData.message : 'Operation success', 'success');
                }
                return responseData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
  
        showMessage(message, type) {
            alert(message);
        },
    },
  };
  </script>