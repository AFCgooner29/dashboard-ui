<template>
    <GenericListView title="Customer Management" :fields="fields" :items="customers" :actions="actions"
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
            customers: [
                {
                    "customerId": "123",
                    "name": "Dukaan",
                    "customerAddress": "Ludhiana",
                    "subscriptionTypeId": "1234",
                    "enabled": true,
                },
                {
                    "customerId": "123",
                    "name": "Dukaan",
                    "customerAddress": "Ludhiana",
                    "subscriptionTypeId": "1234",
                    "enabled": true,
                },
            ],
            fields: [
                { key: 'customerId', label: 'Customer ID' },
                { key: 'name', label: 'Name' },
                { key: 'customerAddress', label: 'Address' },
                { key: 'subscriptionTypeId', label: 'Subscription Type' },
                { key: 'enabled', label: 'Status' },
                { key: 'actions', label: 'Actions' },
            ],
            actions: {
                headerActions: { label: 'Onboard New Customer', link: { name: 'customer-form', routeParams: { customerId: 'CREATE' }, routeQueryParams: { mode: 'CREATE' } } },
                items: [
                    { name: 'view', label: 'View', icon: 'visibility', routeName: 'customer-form', routeParams: { customerId: 'customerId' }, routeQueryParams: { mode: 'VIEW' } },
                    { name: 'edit', label: 'Edit', icon: 'edit', routeName: 'customer-form', routeParams: { customerId: 'customerId' }, routeQueryParams: { mode: 'EDIT' } },
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