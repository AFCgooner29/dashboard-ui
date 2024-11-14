<template>
    <va-card>
        <!-- Header with Title and Action Button -->
        <div class="header">
            <h2>{{ title }}</h2>
            <VaButton v-if="actions.headerActions" class="mr-6 mb-2">
                <RouterLink :to="{ name: actions.headerActions.link.name, params: actions.headerActions.link.routeParams, query: actions.headerActions.link.routeQueryParams}" style="color:white; text-decoration:none;">
                    {{ actions.headerActions.label }}
                </RouterLink>
            </VaButton>
        </div>

        <!-- Data Table -->
        <VaDataTable :items="items" :columns="fields" striped>
            <!-- Dynamically Render Cell Templates if Provided -->
            <template v-for="field in fields" #[`cell(${field.key})`]="{ rowData }" :key="field.key">
                <!-- Check if a custom component is provided; otherwise render field value directly in span -->
                <component :is="field.cellTemplate || 'span'" :row-data="rowData" :field-key="field.key"
                    :config="field.config" :stored-to-display-mapping="storedToDisplayMapping">
                    <!-- If no custom template, display the value for this field in span -->
                    <template v-if="!field.cellTemplate">{{ rowData[field.key] }}</template>
                </component>
            </template>

            <!-- Actions Cell -->
            <template v-if="actions.actionsAvailable" #cell(actions)="{ rowData }">
                <VaButton v-for="action in actions.items" :key="action.name" :preset="action.preset || 'plain'"
                    :icon="action.icon" class="ml-3" :label="action.label" @click="handleAction(action, rowData)" />
            </template>
        </VaDataTable>

        <!-- Expanded View Modal -->
        <va-modal v-model="isModalOpen" :title="modalTitle">
            <component :is="modalContent" :item="selectedItem" />
            <va-button color="primary" @click="isModalOpen = false">Close</va-button>
        </va-modal>
    </va-card>
</template>

<script>
import { VaDataTable, VaButton, VaModal } from 'vuestic-ui';
import ContextCell from '@/views/client/ruleManagement/components/ContextCell.vue';
import RuleConditionsCell from '@/views/client/ruleManagement/components/RuleConditionsCell.vue';
import ConcequencesCell from '@/views/client/ruleManagement/components/ConcequencesCell.vue';

export default {
    components: { VaDataTable, VaButton, VaModal, ConcequencesCell, RuleConditionsCell, ContextCell },
    props: {
        title: { type: String, required: true },
        fields: { type: Array, required: true },
        items: { type: Array, required: true },
        actions: {
            type: Object,
            default: () => ({
                headerActions: null,
                items: [],
                actionsAvailable: false,
            }),
        },
        modalTitle: { type: String, default: 'Details' },
        modalContent: { type: [Object, String], default: 'span' }, // Component or default view for modal
        storedToDisplayMapping: { type: Object }
    },
    data() {
        return {
            isModalOpen: false,
            selectedItem: null,
        };
    },
    methods: {
        handleAction(action, item = null) {
            var params;
            var queryParams;
            switch (action.name) {
                case 'add':
                    this.$router.push({ name: this.actions.add.link});
                    break;
                case 'view':
                    params = {};
                    queryParams = {};
                    if (action.routeParams) {
                        for (const [paramKey, itemField] of Object.entries(action.routeParams)) {
                            params[paramKey] = item[itemField];
                        }
                    }
                    if (action.routeQueryParams) {
                        for (const [paramKey, data] of Object.entries(action.routeQueryParams)) {
                            queryParams[paramKey] = data;
                        }
                    }
                    // Push the route with name and params
                    this.$router.push({ name: action.routeName, params, query: queryParams });
                    break;
                case 'delete':
                    this.$emit('delete-item', item);
                    break;
                case 'edit':
                    // Build params dynamically if routeParams is specified in the action
                    params = {};
                    queryParams = {};
                    if (action.routeParams) {
                        for (const [paramKey, itemField] of Object.entries(action.routeParams)) {
                            params[paramKey] = item[itemField];
                        }
                    }
                    if (action.routeQueryParams) {
                        for (const [paramKey, data] of Object.entries(action.routeQueryParams)) {
                            queryParams[paramKey] = data;
                        }
                    }
                    // Push the route with name and params
                    this.$router.push({ name: action.routeName, params, query: queryParams });
                    break;
                default:
                    this.$emit(`action-${action.name}`, item);
            }
        },
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