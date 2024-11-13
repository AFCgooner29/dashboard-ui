<template>
    <div>
        <div class="header">
            <h2>Search Config Management</h2>
            <VaButton v-if="isPlatformAdmin" class="mr-6 mb-2">
                <RouterLink :to="{ name: 'addSearchIndex' }" style="color:white; text-decoration:none;">Add New Search Index</RouterLink>
            </VaButton>
        </div>
        <VaDataTable :items="searchIndices" :columns="columns">
            <template v-if="isPlatformAdmin" #cell(actions)="{ rowData }">
                <!-- <VaButton preset="plain" icon="visibility" class="ml-3" @click="viewRule(rowData)" label="Edit" /> -->
                <VaButton preset="plain" icon="edit" class="ml-3" label="Edit"
                    :to="{ name: 'editSearchIndex', params: { id: rowData.indexName } }"
                    style="color:white; text-decoration:none;" />
                <VaButton preset="plain" icon="cancel" class="ml-3" @click="disableIndex(rowData.indexName)"
                    label="Disable" />
            </template>
        </VaDataTable>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchIndices: [],
            columns: [
                { key: 'indexName', label: 'Index Name' },
                { key: 'searchIndexType', label: 'Type' },
                { key: 'version', label: 'Version' },
                { key: 'enabled', label: 'Enabled' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'searchClientId', label: 'Search Client ID' },
                { key: 'configuredFields', label: 'Configured Fields' },
                { key: 'actions', label: 'Actions' }
            ],
        };
    },
    computed: {
        isPlatformAdmin() {
            return true
            return localStorage.getItem('roles')?.includes('PLATFORM_ADMIN');
        },
    },
    methods: {
        fetchSearchIndices() {
            // axios.get('/auth/admin/manage/searchIndex')
            //     .then(response => {
            //         this.searchIndices = response.data;
            //     })
            //     .catch(error => console.error("Error fetching search indices:", error));
            this.searchIndices = [
                {
                    indexName : "TEst",
                    searchIndexType : "SEARCH",
                    version : 1,
                    enabled : true,
                    customerId : "123",
                    searchClientId : "123"
                }
            ]
        },
        navigateToAdd() {
            this.$router.push({ name: 'AddSearchIndex' });
        },
        navigateToEdit(id) {
            this.$router.push({ name: 'EditSearchIndex', params: { id } });
        },
        disableIndex(id) {
            axios.patch(`/auth/admin/manage/searchIndex/${id}/disable`)
                .then(() => this.fetchSearchIndices())
                .catch(error => console.error("Error disabling search index:", error));
        }
    },
    mounted() {
        this.fetchSearchIndices();
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