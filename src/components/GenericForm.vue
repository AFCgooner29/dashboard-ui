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
                    :disabled="field.disabled || !isFormEditable(mode)" :hidden="field.hidden"
                    :error="!!errors[field.name]" :error-messages="errors[field.name]" />

                <!-- Multi-entry Composite Fields -->
                <div v-if="field.type === 'multi-entry'" class="multi-entry-group">
                    <h4>{{ field.label }}</h4>
                    <div v-for="(entry, entryIndex) in formData[field.name]" :key="entryIndex" class="multi-entry-item">
                        <h5>{{ field.entryLabel || 'Entry' }} {{ entryIndex + 1 }}</h5>
                        <div v-for="subField in field.subFields" :key="subField.name">
                            <component :is="getComponentType(subField)"
                                v-model="formData[field.name][entryIndex][subField.name]" :label="subField.label"
                                :type="subField.inputType || 'text'" :options="subField.options || []"
                                :readonly="!isFormEditable(mode)" :required="subField.required || false"
                                :error="!!errors[`${field.name}.${entryIndex}.${subField.name}`]"
                                :error-messages="errors[`${field.name}.${entryIndex}.${subField.name}`]" />
                        </div>
                        <va-button v-if="isFormEditable(mode)" size="small" color="danger"
                            @click="removeEntry(field.name, entryIndex)">
                            Remove Entry
                        </va-button>
                    </div>
                    <va-button v-if="isFormEditable(mode)" size="small" color="primary" @click="addEntry(field.name)">
                        Add Entry
                    </va-button>
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
            return mode === 'CREATE' || mode === 'EDIT';
        },

        validateForm() {
            this.errors = {}; // Clear previous errors
            let isValid = true;
            var missingRequiredFields = "";

            // Iterate over all fields in the form structure
            for (const field of this.formStructure.fields) {
                if (field.required && !this.formData[field.name]) {
                    // Generate error message
                    this.errors[field.name] = `${field.label || field.name} is required to be filled`;
                    isValid = false;
                    missingRequiredFields += field.label + "\n";
                }

                // Handle multi-entry fields
                if (field.type === 'multi-entry' && Array.isArray(this.formData[field.name])) {
                    this.formData[field.name].forEach((entry, entryIndex) => {
                        field.subFields.forEach((subField) => {
                            const value = entry[subField.name];
                            if (subField.required && !value) {
                                const errorKey = `${field.name}.${entryIndex}.${subField.name}`;
                                this.errors[errorKey] = `${subField.label || subField.name} is required to be filled`;
                                isValid = false;
                                missingRequiredFields += field.label + ":" + subField.label + " #" + entryIndex + "\n";
                            }
                        });
                    });
                }
            }
            return missingRequiredFields;
        },

        handleSubmit() {
            var errorMessage = this.validateForm();
            if (errorMessage !== "") {
                alert("Please fill required Fields \n" + errorMessage);
                return; // Stop submission if validation fails
            }

            this.loading = true;
            const transformedData = this.transformSelectFields(this.formData);
            if (this.mode === 'EDIT') {
                this.updateModelData(transformedData);
            } else {
                this.saveModelData(transformedData);
            }

            setTimeout(() => {
                this.loading = false;
                this.$router.back();
            }, 3000);
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
        const errors = ref({});
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
            formData.value[fieldName].push({});
        };

        const removeEntry = (fieldName, index) => {
            formData.value[fieldName].splice(index, 1);
        };

        const transformSelectFields = (data) => {
            if (Array.isArray(data)) {
                // Recursively process each item in the array
                return data.map((entry) => transformSelectFields(entry));
            } else if (typeof data === 'object' && data !== null) {
                const transformed = {};
                for (const key in data) {
                    if (data[key] && typeof data[key] === 'object') {
                        if ('value' in data[key]) {
                            // If object has a "value" field, use its value
                            transformed[key] = data[key].value;
                        } else {
                            // Otherwise, recursively process the object
                            transformed[key] = transformSelectFields(data[key]);
                        }
                    } else {
                        // Copy primitive fields as-is
                        transformed[key] = data[key];
                    }
                }
                return transformed;
            }
            return data; // Return primitive values as-is
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
            errors,
            loading,
            getComponentType,
            addEntry,
            removeEntry,
            transformSelectFields,
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