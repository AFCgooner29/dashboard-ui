<template>
    <div>
        <div class="header">
            <h2>Search Config Management</h2>
            <VaButton v-if="isPlatformAdmin" class="mr-6 mb-2">
                <RouterLink :to="{ name: 'addSearchConfig' }" style="color:white; text-decoration:none;">Add Search Config</RouterLink>
            </VaButton>
        </div>
        <VaDataTable :items="searchConfigs" :columns="columns">
            <template #cell(actions)="{ rowData }">
                <VaButton @click="navigateToEdit(rowData.indexName)">Edit</VaButton>
            </template>
        </VaDataTable>
    </div>
</template>

<script>
import { VaButton, VaDataTable } from 'vuestic-ui';
import axios from 'axios';

export default {
    data() {
        return {
            searchConfigs: [
                {
                    indexName : "test",
                    searchConfigKey :"abc",
                    customerId: "234"
                }
            ],
            columns: [
                { key: 'indexName', label: 'Index Name' },
                { key: 'searchConfigKey', label: 'Search Config Key' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'actions', label: 'Actions' }
            ]
        };
    },
    computed: {
        isPlatformAdmin() {
            return true
            return localStorage.getItem('roles')?.includes('PLATFORM_ADMIN');
        },
    },
    methods: {
        async fetchSearchConfigs() {
            try {
                const response = await axios.get('/auth/admin/manage/searchConfig');
                this.searchConfigs = response.data;
            } catch (error) {
                console.error('Error fetching search configs:', error);
            }
        },
        navigateToAdd() {
            this.$router.push({ name: 'addSearchConfig' });
        },
        navigateToEdit(configId) {
            this.$router.push({ name: 'editSearchConfig', params: { id : configId } });
        }
    },
    created() {
        this.fetchSearchConfigs();
    }
};
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>