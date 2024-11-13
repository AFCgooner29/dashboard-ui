<template>
    <va-card>
        <div class="header">
            <h2>Rule Management</h2>
            <VaButton v-if="isPlatformAdmin" class="mr-6 mb-2">
                <RouterLink :to="{ name: 'create-rule' }" style="color:white; text-decoration:none;">Add New Rule
                </RouterLink>
            </VaButton>
        </div>

        <!-- Rules Table -->
        <VaDataTable :items="rules" :columns="fields" striped>
            <template #cell(context)="{ rowData }">
                <div v-for="(context, index) in rowData['context'].slice(0, 2)" :key="index">
                {{ context["key"] }} <VaIcon name="arrow_forward" /> {{ context["value"] }}
                </div>
                <span v-if="rowData['context'].length > 2">...</span>
            </template>

            <template #cell(ruleConditions)="{ rowData }">
                <div v-for="(ruleCondition, index) in rowData['ruleConditions'].slice(0, 2)" :key="index">
                {{ storedToDisplayMapping[ruleCondition["operator"]] }} <VaIcon name="arrow_forward" /> {{ ruleCondition["value"] }}
                </div>
                <span v-if="rowData['ruleConditions'].length > 2">...</span>
            </template>

            <template #cell(consequences)="{ rowData }">
                <div v-for="(consequence, index) in rowData['consequences'].slice(0, 2)" :key="index">
                {{ consequence["attributeName"] }} <VaIcon name="arrow_forward" /> {{ storedToDisplayMapping[consequence["consequenceType"]] }} <VaIcon name="arrow_forward" /> {{ consequence["attributeValue"] }}
                </div>
                <span v-if="rowData['consequences'].length > 2">...</span>
            </template>

            <template v-if="isPlatformAdmin" #cell(actions)="{ rowData }">
                <VaButton preset="plain" icon="visibility" class="ml-3" @click="viewRule(rowData)" label="Edit" />
                <VaButton preset="plain" icon="edit" class="ml-3" label="Edit"
                    :to="{ name: 'edit-rule', params: { ruleId: rowData.ruleId } }"
                    style="color:white; text-decoration:none;" />
                <VaButton preset="plain" icon="cancel" class="ml-3" @click="deleteRule(rowData['ruleId'])"
                    label="Disable" />
            </template>
        </VaDataTable>

        <!-- Expanded View Modal -->
        <va-modal v-model="isModalOpen" title="Rule Details">
            <div v-if="selectedRule">
                <h4>Context</h4>
                <ul>
                    <li v-for="(context, index) in selectedRule.context" :key="index">
                        {{ context.key }} <VaIcon name="arrow_forward" /> {{ context.value }}
                    </li>
                </ul>

                <h4>Conditions</h4>
                <ul>
                    <li v-for="(condition, index) in selectedRule.ruleConditions" :key="index">
                        {{ storedToDisplayMapping[condition.operator] }} <VaIcon name="arrow_forward" /> {{ condition.value }}
                    </li>
                </ul>

                <h4>Consequences</h4>
                <ul>
                    <li v-for="(consequence, index) in selectedRule.consequences" :key="index">
                        {{ consequence.attributeName }} <VaIcon name="arrow_forward" /> {{ storedToDisplayMapping[consequence.consequenceType] }} 
                        <VaIcon name="arrow_forward" />{{ consequence.attributeValue }}
                    </li>
                </ul>
            </div>
            <va-button color="primary" @click="isModalOpen = false">Close</va-button>
        </va-modal>
    </va-card>
</template>

<script>
import { VaDataTable, VaButton, VaModal } from 'vuestic-ui';

export default {
    components: { VaDataTable, VaButton, VaModal },
    data() {
        return {
            rules: [],
            selectedRule: null,
            isModalOpen: false,
            fields: [
                { key: 'ruleId', label: 'Rule ID' },
                { key: 'indexName', label: 'Index Name' },
                { key: 'customerId', label: 'Customer ID' },
                { key: 'enabled', label: 'Enabled' },
                { key: 'context', label: 'Context' },
                { key: 'ruleConditions', label: 'Conditions' },
                { key: 'consequences', label: 'Consequences' },
                { key: 'actions', label: 'Actions' },
            ],
            storedToDisplayMapping: {
                'STARTS_WITH': 'Starts With',
                'IS': 'Is',
                'BOOST_WITH': 'Boost With',
                'BOOST_THEN': 'Boost Then',
                'FILTER': 'Filter',
                'HIDE': 'Hide',
                'BURY_WITH': 'Bury With',
                'BURY_THEN': 'Bury Then'
            }
        };
    },
    computed: {
        isPlatformAdmin() {
            return true
            return localStorage.getItem('roles')?.includes('PLATFORM_ADMIN');
        },
    },
    methods: {
        fetchRules() {
            // fetch('/auth/admin/manage/rule/all')
            //     .then((response) => response.json())
            //     .then((data) => {
            //         this.rules = data.content;
            //     });
            this.rules = [
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
            ]
        },
        goToCreateRule() {
            this.$router.push('/create-rule');
        },
        viewRule(rule) {
            this.selectedRule = rule;
            this.isModalOpen = true;
        },
        editRule(rule) {
            this.$router.push(`/edit-rule/${rule.ruleId}`);
        },
        deleteRule(ruleId) {
            fetch(`/auth/admin/manage/rule/${ruleId}`, {
                method: 'DELETE',
            }).then(() => this.fetchRules());
        },
    },
    mounted() {
        this.fetchRules();
    },
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