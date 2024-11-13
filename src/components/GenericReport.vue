<template>
    <va-card>
        <!-- Header with Title and Action Button -->
        <div class="header">
            <h2>{{ title }}</h2>
            <VaButton v-if="actions.add" @click="handleAction('add')" class="mr-6 mb-2">
                <RouterLink :to="actions.add.link" style="color:white; text-decoration:none;">
                    {{ actions.add.label }}
                </RouterLink>
            </VaButton>
        </div>

        <!-- Data Table -->
        <VaDataTable :items="items" :columns="fields" striped>
            <!-- Dynamically Render Cell Templates if Provided -->
            <template v-for="field in fields" #[`cell(${field.key})`] :key="field.key" v-slot="{ rowData }">
                <component :is="field.cellTemplate || 'span'" :row-data="rowData" :field-key="field.key"
                    :config="field.config" />
            </template>

            <!-- Actions Cell -->
            <template v-if="actions.actionsAvailable" #cell(actions)="{ rowData }">
                <VaButton v-for="action in actions.items" :key="action.name" :preset="action.preset || 'plain'"
                    :icon="action.icon" class="ml-3" :label="action.label"
                    @click="handleAction(action.name, rowData)" />
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

export default {
    components: { VaDataTable, VaButton, VaModal },
    props: {
        title: { type: String, required: true },
        fields: { type: Array, required: true },
        items: { type: Array, required: true },
        actions: {
            type: Object,
            default: () => ({
                add: null,
                items: [],
                actionsAvailable: false,
            }),
        },
        modalTitle: { type: String, default: 'Details' },
        modalContent: { type: [Object, String], default: 'span' }, // Component or default view for modal
    },
    data() {
        return {
            isModalOpen: false,
            selectedItem: null,
        };
    },
    methods: {
        handleAction(actionName, item = null) {
            switch (actionName) {
                case 'add':
                    this.$router.push(this.actions.add.link);
                    break;
                case 'view':
                    this.selectedItem = item;
                    this.isModalOpen = true;
                    break;
                case 'delete':
                    this.$emit('delete-item', item);
                    break;
                case 'edit':
                    this.$router.push(`/edit-rule/${item.ruleId}`);
                    break;
                default:
                    this.$emit(`action-${actionName}`, item);
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