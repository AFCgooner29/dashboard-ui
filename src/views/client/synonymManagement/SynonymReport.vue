<template>
    <GenericListView :title="title" :fields="fields" :items="items" :actions="actions"
        :storedToDisplayMapping="storedToDisplayMapping"/>
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
            config: reportConfig.SYNONYM_REPORT,
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
                const response = await axios.get(apiPrefix+'auth/admin/manage/synonyms/all', {
                    params: {
                        page: 0, // Example pagination parameter
                        size: 100 // Example page size
                    },
                    headers : {
                        Authorization: "Bearer "+localStorage.getItem("userSession")
                    },
                });
                this.items = response.data.content; // Adjust based on API response structure
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        }
    },
    mounted() {
        this.fetchItems(); // Fetch items when the component is mounted
    }
};
</script>