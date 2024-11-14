<template>
    <GenericListView title="Search Index Management" :fields="fields" :items="items" :actions="actions"
        :storedToDisplayMapping="storedToDisplayMapping" @delete-item="deleteRule" />
</template>

<script>
import GenericListView from '../../../components/GenericReport.vue';

export default {
    components: { GenericListView },
    data() {
        return {
            storedToDisplayMapping: {
                'STARTS_WITH': 'Starts With',
                'IS': 'Is',
                'BOOST_WITH': 'Boost With',
                'BOOST_THEN': 'Boost Then',
                'FILTER': 'Filter',
                'HIDE': 'Hide',
                'BURY_WITH': 'Bury With',
                'BURY_THEN': 'Bury Then'
            },
            items: [
                {
                    id : "134",
                    indexName: "Search Test",
                    searchIndexType: "SEARCH",
                    version: 1,
                    enabled: true,
                    customerId: "123",
                    searchClientId: "123",
                },
            ],
            fields: [
                { key: 'indexName', label: 'Index Name' },
                { key: 'searchIndexType', label: 'Type' },
                { key: 'version', label: 'Version' },
                { key: 'enabled', label: 'Enabled' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'searchClientId', label: 'Search Client ID' },
                { key: 'actions', label: 'Actions' },
            ],
            actions: {
                headerActions: { label: 'Create New Search Index', link: { name: 'search-index-form', routeParams: { id: 'CREATE' }, routeQueryParams: { mode: 'CREATE' } } },
                items: [
                    { name: 'view', label: 'View', icon: 'visibility',  link: { name: 'search-index-form', routeParams: { id: 'id' }, routeQueryParams: { mode: 'VIEW' } } },
                    { name: 'edit', label: 'Edit', icon: 'edit', link: { name: 'search-index-form', routeParams: { id: 'id' }, routeQueryParams: { mode: 'EDIT' } } },
                    // { name: 'delete', label: 'Disable', icon: 'cancel', routeName: '' },
                ],
                actionsAvailable: true,
            },
        };
    },
    methods: {
        deleteRule(rule) {
            // handle delete API call
            this.rules = this.rules.filter(r => r.ruleId !== rule.ruleId);
        },
    },
};
</script>