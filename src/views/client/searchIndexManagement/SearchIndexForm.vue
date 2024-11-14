<template>
    <GenericForm :formStructure="formStructure" :mode="mode" :fetchModelData="fetchRuleData" />
</template>

<script>
import GenericForm from '@/components/GenericForm.vue';

export default {
    components: { GenericForm },
    data() {
        return {
            mode: this.$route.query.mode || 'VIEW', // default to VIEW if mode is not provided
            formStructure: {
                header: 'Search Index Form',
                fields: [
                    {
                        name: 'indexName',
                        label: 'Index Id',
                        type: 'view',
                        disabled: true,
                        hidden: true
                    },
                    {
                        name: 'indexName',
                        label: 'Index Name',
                        type: 'input'
                    },
                    {
                        name: 'enabled',
                        label: 'Enabled',
                        type: 'boolean'
                    },
                    {
                        name: 'searchClientId',
                        label: 'Search Client Id',
                        type: 'input'
                    },
                    {
                        name: 'customerId',
                        label: 'Customer Id',
                        type: 'input'
                    },
                    {
                        name: 'configuredFields',
                        label: 'Configured Fields',
                        type: 'multi-entry',
                        entryLabel: 'Configured Field',
                        nestedEnabled: false,
                        subFields: [
                            { name: 'fieldName', label: 'Key', type: 'input', required: true },
                            { name: 'fieldType', label: 'Field Type', type: 'input', required: true },
                            { name: 'fieldDataType', label: 'Field Data Type', type: 'input', required: true },
                            { name: 'enabled', label: 'Search Enabled', type: 'boolean', required: true },
                            { name: 'isFuzzySearchEnabled', label: 'Typo Matching Enabled', type: 'boolean', required: true },
                            { name: 'importance', label: 'Value', type: 'input', required: true },
                        ]
                    },
                ],
            }
        };
    },
    methods: {
        deleteRule(rule) {
            // handle delete API call
            this.rules = this.rules.filter(r => r.ruleId !== rule.ruleId);
        },
        fetchRuleData() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const data = {
                        id: "134",
                        indexName: "Search Test",
                        searchIndexType: "SEARCH",
                        version: 1,
                        enabled: true,
                        customerId: "123",
                        searchClientId: "123",
                    };

                    // Simulating a 5-second delay before resolving the data
                    resolve(data);
                }, 5000);
            });
        }
    },
};
</script>