<template>
    <va-card>
        <!-- Form Header -->
        <h3>{{ formStructure.header }}</h3>

        <div v-if="loading" class="loader-overlay">
            <VaIcon class="mr-2" name="loop" spin="clockwise" size="large" />
        </div>

        <form v-if="!loading" @submit.prevent="handleSubmit">
            <div v-for="field in formStructure.fields" :key="field.name" class="form-group">
                <!-- Standard Fields -->
                <component v-if="field.type !== 'multi-entry' && field.type !== 'group'" :is="getComponentType(field)"
                    v-model="formData[field.name]" :label="field.label" :type="field.inputType || 'text'"
                    :options="field.options || []" :readonly="!isFormEditable(mode) || field.disabled"
                    :placeholder="field.placeholder || ''" :required="field.required || false"
                    :disabled="field.disabled || !isFormEditable(mode)"
                    :hidden="field.hidden" />

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
                                :readonly="!isFormEditable(mode)" :required="subField.required || false" />
                        </div>
                        <!-- Nested Fields within each multi-entry item -->
                        <div v-if="entry.nestedEnabled" v-for="(nestedField, nestedIndex) in entry.nestedFields"
                            :key="nestedIndex" class="nested-field">
                            <va-input v-model="formData[field.name][entryIndex].nestedFields[nestedIndex].fieldName"
                                label="Nested Field Name" />
                            <va-select v-model="formData[field.name][entryIndex].nestedFields[nestedIndex].fieldType"
                                :options="fieldTypes" label="Nested Field Type" />
                        </div>
                        <va-button v-if="entry.nestedEnabled && isFormEditable(mode)" size="small" color="secondary"
                            @click="addNestedField(entryIndex, field.name)">Add Nested Field</va-button>
                        <va-button v-if="isFormEditable(mode) && multiEntryActionPossible(field.removeAvailableModes)" size="small" color="danger" @click="removeEntry(field.name, entryIndex)">Remove
                            Entry</va-button>
                    </div>
                    <va-button v-if="isFormEditable(mode) && multiEntryActionPossible(field.addAvailableModes)" size="small" color="primary"
                        @click="addEntry(field.name)">Add {{
                            field.entryLabel || 'Entry' }}</va-button>
                </div>
                <div v-if="field.type === 'group'" class="multi-entry-group">
                    <h4>{{ field.label }}</h4>
                    <div v-if="formData[field.name]" :key="formData[field.name] + 'entry'" class="multi-entry-item">
                        <h5>{{ field.entryLabel || 'Entry' }}</h5>
                        <!-- Render each subfield within the multi-entry field -->
                        <div v-for="subField in field.subFields" :key="subField.name">
                            <component :is="getComponentType(subField)"
                                v-model="formData[field.name][subField.name]" :label="subField.label"
                                :type="subField.inputType || 'text'" :options="subField.options || []"
                                :readonly="!isFormEditable(mode)" :required="subField.required || false" />
                        </div>
                    </div>    
                    <va-button v-if="isFormEditable(mode) && !formData[field.name]" size="small" color="primary"
                        @click="addGroupEntryEntry(field.name)">Add {{
                            field.entryLabel || 'Entry' }}</va-button>
                </div>
            </div>

            <!-- Submit Button -->
            <va-button v-if="isFormEditable(mode)" type="submit" color="primary">Save</va-button>
        </form>
    </va-card>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';


export default {
    methods: {
        isFormEditable(mode) {
            return mode === "CREATE" || mode === "EDIT"
        },
    },
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
        fetchModelData: {
            type: Function,
            required: true,
        },
        saveModelData: {
            type: Function,
            required: true,
        },
        updateModelData: {
            type: Function,
            required: true,
        },
    },
    setup(props, { emit }) {
        const formData = ref({});
        const loading = ref(false);
        const router = useRouter();

        watch(
            () => props.model,
            (newModel) => {
                formData.value = { ...newModel };
            },
            { immediate: true }
        );

        const getComponentType = (field) => {
            switch (field.type) {
                case 'select':
                    return 'va-select';
                case 'textarea':
                    return 'va-textarea';
                case 'file':
                    return 'va-file-upload';
                case 'boolean':
                    return 'va-switch';
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

        const addGroupEntryEntry = (fieldName) => {
            if (!formData.value[fieldName]) formData.value[fieldName] = {};
            console.log("adding group entyr for " +fieldName)
            props.formStructure.fields.forEach((field) => {
            if (field.type === 'group' && field.name == fieldName) {
                formData[field.name] = {}; // Initialize group field
                field.subFields.forEach((subField) => {
                    console.log("adding group entyr for " +subField.name)
                if (!(subField.name in formData[field.name])) {
                    formData[field.name][subField.name] = ''; // Initialize subfield
                }
                });
                console.log("adding group entyr for " +formData[field.name] != undefined)
            }
            });
        };

        const multiEntryActionPossible = (availableModes) => {
            if (availableModes) {
                return availableModes.includes(props.mode)
            }
            return true
        }

        const removeEntry = (fieldName, index) => {
            formData.value[fieldName].splice(index, 1);
        };

        const addNestedField = (entryIndex, fieldName) => {
            formData.value[fieldName][entryIndex].nestedFields.push({
                fieldName: '',
                fieldType: '',
            });
        };

        const transformSelectFields = (data) => {
        if (Array.isArray(data)) {
            return data.map((entry) => transformSelectFields(entry));
        } else if (typeof data === "object" && data !== null) {
            const transformed = {};
            for (const key in data) {
                if (data[key] && typeof data[key] === "object" && 'text' in data[key] && 'value' in data[key]) {
                    // Replace { text, value } with value
                    transformed[key] = data[key].value;
                } else if (Array.isArray(data[key]) || typeof data[key] === "object") {
                    // Recursively process nested fields or arrays
                    transformed[key] = transformSelectFields(data[key]);
                } else {
                    // Keep other fields as is
                    transformed[key] = data[key];
                }
            }
            return transformed;
        }
        return data;
    };

        const handleSubmit = () => {
            loading.value = true;
            const transformedData = transformSelectFields(formData.value);

            if (props.mode === 'EDIT') {
                props.updateModelData(transformedData);
            } else {
                props.saveModelData(transformedData)
            }
            setTimeout(() => {
                loading.value = false;
                router.back(); // Use router instance
            }, 3000); 
        };

        // Fetch data when mode is EDIT or VIEW
        if (props.mode === 'EDIT' || props.mode === 'VIEW') {
            loading.value = true;
            props.fetchModelData()
                .then((data) => {
                    formData.value = data;
                })
                .catch((error) => {
                    console.error('Error fetching rule data:', error);
                })
                .finally(() => {
                    loading.value = false;
                });
        }

        return {
            formData,
            loading,
            getComponentType,
            addEntry,
            removeEntry,
            addNestedField,
            handleSubmit,
            addGroupEntryEntry,
            multiEntryActionPossible,
        };
    },
};
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

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