<template>
    <GenericListView title="Search Config Management" :fields="fields" :items="searchConfigs" :actions="actions"
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
            searchConfigs: [
                {
                    indexName: "test",
                    searchConfigKey: "abc",
                    customerId: "234"
                },
            ],
            fields: [
                { key: 'indexName', label: 'Index Name' },
                { key: 'searchConfigKey', label: 'Search Config Key' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'actions', label: 'Actions' },
            ],
            actions: {
                headerActions: { label: 'Create New Search Config', link: { name: 'search-config-form', routeParams: { id: 'CREATE' }, routeQueryParams: { mode: 'CREATE' } } },
                items: [
                    { name: 'view', label: 'View', icon: 'visibility', routeName: 'search-config-form', routeParams: { id: 'customerId' }, routeQueryParams: { mode: 'VIEW' } },
                    { name: 'edit', label: 'Edit', icon: 'edit', routeName: 'search-config-form', routeParams: { id: 'customerId' }, routeQueryParams: { mode: 'EDIT' } },
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