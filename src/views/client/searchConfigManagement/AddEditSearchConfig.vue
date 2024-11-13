<template>
    <div>
        <h2>{{ isEdit ? 'Edit' : 'Add' }} Search Config</h2>
        <VaForm @submit="handleSubmit">
            <VaInput v-model="config.indexName" label="Index Name" required />
            <VaInput v-model="config.searchConfigKey" label="Config Key" required />
            <VaInput v-model="config.customerId" label="Customer ID" required />
            <!-- Add more fields as needed -->

            <VaButton type="submit">{{ isEdit ? 'Update' : 'Create' }}</VaButton>
        </VaForm>
    </div>
</template>

<script>
import { VaForm, VaInput, VaButton } from 'vuestic-ui';
import axios from 'axios';

export default {
    props: {
        id: String,
        isEdit: Boolean
    },
    data() {
        return {
            config: {
                indexName: '',
                searchConfigKey: '',
                customerId: ''
                // Initialize other fields as needed
            }
        };
    },
    methods: {
        async fetchConfig() {
            if (this.isEdit) {
                const response = await axios.get(`/auth/admin/manage/searchConfig/${this.id}`);
                this.config = response.data;
            }
        },
        async handleSubmit() {
            try {
                if (this.isEdit) {
                    await axios.put(`/auth/admin/manage/searchConfig/${this.id}`, this.config);
                } else {
                    await axios.post('/auth/admin/manage/searchConfig', this.config);
                }
                this.$router.push({ name: 'SearchConfigList' });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    },
    created() {
        this.fetchConfig();
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