<template>
    <va-card>
        <!-- Form Header -->
        <h3>{{ formStructure.header }}</h3>

        <form @submit.prevent="handleSubmit">
            <div v-for="field in formStructure.fields" :key="field.name" class="form-group">

                <!-- Standard Fields -->
                <component v-if="field.type !== 'multi-entry'" :is="getComponentType(field)"
                    v-model="formData[field.name]" :label="field.label" :type="field.inputType || 'text'"
                    :options="field.options || []" :readonly="mode === 'VIEW'" :placeholder="field.placeholder || ''"
                    :required="field.required || false" :disabled="field.disabled || mode === 'VIEW'" />

                <!-- Multi-entry Composite Fields -->
                <div v-if="field.type === 'multi-entry'" class="multi-entry-group">
                    <h4>{{ field.label }}</h4>
                    <div v-for="(entry, entryIndex) in formData[field.name]" :key="entryIndex" class="multi-entry-item">
                        <h5>{{ field.entryLabel || 'Entry' }} {{ entryIndex + 1 }}</h5>

                        <!-- Render each subfield within the multi-entry field -->
                        <div v-for="subField in field.subFields" :key="subField.name">
                            <component :is="getComponentType(subField)"
                                v-model="formData[field.name][entryIndex][subField.name]" :label="subField.label"
                                :type="subField.inputType || 'text'" :options="subField.options || []"
                                :readonly="mode === 'VIEW'" :required="subField.required || false" />
                        </div>

                        <!-- Nested Fields within each multi-entry item -->
                        <div v-for="(nestedField, nestedIndex) in entry.nestedFields" :key="nestedIndex"
                            class="nested-field">
                            <va-input v-model="formData[field.name][entryIndex].nestedFields[nestedIndex].fieldName"
                                label="Nested Field Name" />
                            <va-select v-model="formData[field.name][entryIndex].nestedFields[nestedIndex].fieldType"
                                :options="fieldTypes" label="Nested Field Type" />
                        </div>
                        <va-button size="small" color="secondary" @click="addNestedField(entryIndex, field.name)">Add
                            Nested Field</va-button>
                        <va-button size="small" color="danger" @click="removeEntry(field.name, entryIndex)">Remove
                            Entry</va-button>
                    </div>
                    <va-button size="small" color="primary" @click="addEntry(field.name)">Add {{ field.entryLabel ||
                        'Entry' }}</va-button>
                </div>
            </div>

            <!-- Submit Button -->
            <va-button v-if="mode !== 'VIEW'" type="submit" color="primary">Save</va-button>
        </form>
    </va-card>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        formStructure: {
            type: Object,
            required: true,
        },
        model: {
            type: Object,
            default: () => ({}),
        },
        mode: {
            type: String,
            default: 'CREATE', // VIEW, EDIT, CREATE
            validator: (value) => ['VIEW', 'EDIT', 'CREATE'].includes(value),
        },
    },
    setup(props, { emit }) {
        const formData = ref({});

        watch(
            () => props.model,
            (newModel) => {
                formData.value = { ...newModel };
            },
            { immediate: true }
        );

        const fieldTypes = [
            { label: 'Type 1', value: 'type1' },
            { label: 'Type 2', value: 'type2' },
            // Add other types as needed
        ];

        const getComponentType = (field) => {
            switch (field.type) {
                case 'select':
                    return 'va-select';
                case 'textarea':
                    return 'va-textarea';
                case 'file':
                    return 'va-file-upload';
                case 'input':
                default:
                    return 'va-input';
            }
        };

        const addEntry = (fieldName) => {
            if (!formData.value[fieldName]) formData.value[fieldName] = [];
            formData.value[fieldName].push({
                fieldName: '',
                fieldType: '',
                fieldDataType: '',
                importance: 0,
                isFuzzySearchEnabled: false,
                nestedFields: [],
            });
        };

        const removeEntry = (fieldName, index) => {
            formData.value[fieldName].splice(index, 1);
        };

        const addNestedField = (entryIndex, fieldName) => {
            formData.value[fieldName][entryIndex].nestedFields.push({
                fieldName: '',
                fieldType: '',
            });
        };

        const handleSubmit = () => {
            emit('submit', formData.value);
        };

        return {
            formData,
            fieldTypes,
            getComponentType,
            addEntry,
            removeEntry,
            addNestedField,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1em;
}

.multi-entry-group {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.multi-entry-item {
    padding: 1em;
    border: 1px solid #ddd;
    margin-bottom: 1em;
    border-radius: 4px;
}

.nested-field {
    padding-left: 1em;
    margin-bottom: 0.5em;
}
</style>