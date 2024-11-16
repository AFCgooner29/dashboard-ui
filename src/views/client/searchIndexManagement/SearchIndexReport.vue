<template>
    <GenericListView :title="title" :fields="fields" :items="items" :actions="actions"
        :storedToDisplayMapping="storedToDisplayMapping" />
    <!-- <VaPagination class="pagination-bar" v-model="value" :pages="5" /> -->
</template>

<script>
import GenericListView from '../../../components/GenericReport.vue';
import reportConfig from '../reportConfigs.json';
import axios from 'axios'; // Assuming axios is used for API calls.

export default {
    components: { GenericListView },
    data() {
        return {
            config: reportConfig.SEARCH_INDEX_REPORT,
            items: [], // Initially empty, will be populated by API call
            currentPage: 2, // Current page number
            pageSize: 20, // Number of items per page
            totalItems: 0 // Total number of items, fetched from the API
        };
    },
    computed: {
        title() {
            return this.config.title;
        },
        fields() {
            return this.config.fields;
        },
        actions() {
            return this.config.actions;
        },
        storedToDisplayMapping() {
            return this.config.storedToDisplayMapping;
        }
    },
    methods: {
        async fetchItems() {
            try {
                const apiPrefix = process.env.VUE_APP_API_PREFIX;
                const response = await axios.get(apiPrefix + 'auth/admin/manage/searchIndex', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("userSession")
                    },
                });
                this.items = response.data;
                if (response.data) {
                    var indexNames = [];
                    for (const indexMapping of response.data) { // Adjust the iteration based on actual API response structure
                        if (indexMapping.indexName) {
                            indexNames.push(indexMapping.indexName);
                        }
                    }
                    localStorage.setItem('userIndexes', indexNames.join());
                    this.processAndStoreSearchableFields(response.data)
                } // Adjust based on API response structure
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        },
        processAndStoreSearchableFields(response) {
            // Extract searchable and filterable fields for each index
            const indexFieldData = response.map(index => {
                const searchableFields = index.configuredFields
                    .filter(field => field.isFuzzySearchEnabled || field.searchable) // Assuming `searchable` is a property
                    .map(field => field.fieldName);

                const filterableFields = index.configuredFields
                    .filter(field => field.filterable) // Assuming `filterable` is a property
                    .map(field => field.fieldName);
                console.log(index);
                return {
                    indexName: index.indexName,
                    searchableFields,
                    filterableFields,
                };
            });

            // Store the processed data in localStorage
            localStorage.setItem("searchableFieldData", JSON.stringify(indexFieldData));

            console.log("Searchable and filterable field data stored in localStorage:", indexFieldData);
        },
    },
    mounted() {
        this.fetchItems(); // Fetch items when the component is mounted
    }
};
</script>