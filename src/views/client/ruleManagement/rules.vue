<template>
    <GenericListView title="Rule Management" :fields="fields" :items="rules" :actions="actions" :storedToDisplayMapping = "storedToDisplayMapping"
        @delete-item="deleteRule" />
</template>

<script>
import GenericListView from '../../../components/GenericReport.vue';
// import RuleDetailsModal from '@/components/RuleDetailsModal.vue';

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
            rules: [
                {
                    "ruleId": "123",
                    "indexName": "search_products",
                    "customerId": "12345",
                    "enabled": true,
                    "context": [
                        {
                            key: "cityId",
                            value: "Bangalore"
                        },
                        {
                            key: "bloo",
                            value: "haa"
                        }
                    ],
                    "ruleConditions": [
                        {
                            "operator": "STARTS_WITH",
                            "value": "milk"
                        },
                        {
                            "operator": "IS",
                            "value": "milk"
                        }
                    ],
                    "consequences": [
                        {
                            "attributeName": "categoryId",
                            "consequenceType": "BOOST_WITH",
                            "attributeValue": "1234"
                        },
                        {
                            "attributeName": "categoryId",
                            "consequenceType": "BOOST_WITH",
                            "attributeValue": "1234"
                        }
                    ]
                },
                {
                    "ruleId": "123",
                    "indexName": "search_products",
                    "customerId": "12345",
                    "enabled": true,
                    "context": [
                        {
                            key: "cityId",
                            value: "Bangalore"
                        },
                        {
                            key: "bloo",
                            value: "haa"
                        }
                    ],
                    "ruleConditions": [
                        {
                            "operator": "STARTS_WITH",
                            "value": "milk"
                        },
                        {
                            "operator": "IS",
                            "value": "milk"
                        }
                    ],
                    "consequences": [
                        {
                            "attributeName": "categoryId",
                            "consequenceType": "BOOST_WITH",
                            "attributeValue": "1234"
                        },
                        {
                            "attributeName": "categoryId",
                            "consequenceType": "BOOST_WITH",
                            "attributeValue": "1234"
                        }
                    ]
                }
            ], // Load rules from API
            fields: [
                { key: 'ruleId', label: 'Rule ID' },
                { key: 'indexName', label: 'Index Name' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'enabled', label: 'Enabled' },
                { key: 'context', label: 'Context', cellTemplate: 'ContextCell' },
                { key: 'ruleConditions', label: 'Conditions', cellTemplate: 'RuleConditionsCell' },
                { key: 'consequences', label: 'Consequences', cellTemplate: 'ConcequencesCell' },
                { key: 'actions', label: 'Actions' },
            ],
            actions: {
                headerActions: { label: 'Add New Rule', link: { name: 'rule-form', routeParams:{ruleId : 'CREATE'}, routeQueryParams:{mode : 'CREATE'} } },
                items: [
                    { name: 'view', label: 'View', icon: 'visibility', routeName: 'rule-form', routeParams:{ruleId : 'ruleId'}, routeQueryParams:{mode : 'VIEW'} },
                    { name: 'edit', label: 'Edit', icon: 'edit', routeName: 'rule-form', routeParams:{ruleId : 'ruleId'}, routeQueryParams:{mode : 'EDIT'} },
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