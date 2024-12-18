<template>
    <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchModelData"
        :saveModelData="saveModelData" :updateModelData="updateModelData" />
</template>

<script>
import GenericForm from '@/components/GenericForm.vue';
import formConfigs from '../formConfigs.json'; // Import form configurations

const reverseSelectFields = (data, formStructure, valueToTextMap) => {
    for (const field of formStructure.fields) {
        if (field.type === 'select') {
            // Check if the field is a multi-select
            if (field.multiSelect && Array.isArray(data[field.name])) {
                // Map each value to its corresponding { text, value } object
                data[field.name] = data[field.name].map((value) =>
                    valueToTextMap[value]
                        ? { text: valueToTextMap[value], value: value }
                        : { text: value, value: value }
                );
                console.log(data[field.name]);
            } else if (data[field.name]) {
                // Handle single-select fields
                const value = data[field.name];
                data[field.name] = valueToTextMap[value]
                    ? { text: valueToTextMap[value], value: value }
                    : { text: value, value: value };
            }
        } else if (field.type === 'multi-entry' && Array.isArray(data[field.name])) {
            // Handle multi-entry fields
            for (const entry of data[field.name]) {
                for (const subField of field.subFields) {
                    if (subField.type === 'select') {
                        if (subField.multiSelect && Array.isArray(entry[subField.name])) {
                            // Map each value to its corresponding { text, value } object for multi-select
                            entry[subField.name] = entry[subField.name].map((value) =>
                                valueToTextMap[value]
                                    ? { text: valueToTextMap[value], value: value }
                                    : { text: value, value: value }
                            );
                        } else if (entry[subField.name]) {
                            // Handle single-select fields in multi-entry
                            const value = entry[subField.name];
                            entry[subField.name] = valueToTextMap[value]
                                ? { text: valueToTextMap[value], value: value }
                                : { text: value, value: value };
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
            formStructure: formConfigs.SEARCH_INDEX_FORM, // Load the form configuration
        };
    },
    methods: {
        async fetchModelData() {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                const response = await fetch(`${apiPrefix}auth/admin/manage/searchIndex/${this.$route.params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userSession')}`,
                        'Content-Type': 'application/json',
                    },
                });

                var jsonData = await response.json();

                if (!jsonData || jsonData.statusCode != 200) {
                    this.showMessage(jsonData.message || 'Failed to fetch customer data', 'error');
                    console.error('Failed to fetch customer data');
                }
                jsonData = jsonData.data;
                var finalConfiguredFiedls = [];
                for (let i = 0; i < jsonData.configuredFields.length; i++) {
                    if (!jsonData.configuredFields[i].internal) {
                        finalConfiguredFiedls.push(jsonData.configuredFields[i]);
                    }
                }

                for (let i = 0; i < jsonData.searchIndexTypes.length; i++) {
                    if (jsonData.searchIndexTypes[i] === "SEARCH") {
                        jsonData.enabledForSearch = true
                    } else if (jsonData.searchIndexTypes[i] === "AUTOCOMPLETE") {
                        jsonData.enabledForAutoComplete = true
                    }
                }

                jsonData.configuredFields = finalConfiguredFiedls
                jsonData = reverseSelectFields(jsonData, formConfigs.SEARCH_INDEX_FORM, formConfigs.SEARCH_INDEX_FORM.lovReverseMap);
                return jsonData
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async saveModelData(data) {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                let searchIndexTypes = [];

                if (data.enabledForSearch) {
                    searchIndexTypes.push("SEARCH");
                }

                if (data.enabledForAutoComplete) {
                    searchIndexTypes.push("AUTOCOMPLETE");
                }
                data.searchIndexTypes = searchIndexTypes;

                const response = await fetch(`${apiPrefix}auth/admin/manage/searchIndex`, {
                    method: 'POST',
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
        async updateModelData(data) {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                const response = await fetch(`${apiPrefix}auth/admin/manage/searchIndex/${this.$route.params.id}`, {
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