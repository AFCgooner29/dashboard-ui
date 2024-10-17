<template>
    <div class="rule-management-container">
        <h2>Rule Management</h2>

        <!-- Rule Creation or Update Form -->
        <VaForm @submit.prevent="handleFormSubmit" class="rule-form">
            <div class="form-grid">
                <!-- Rule ID -->
                <VaInput v-model="rule.ruleId" label="Rule ID" placeholder="Enter Rule ID" required />
                <!-- Index Name -->
                <VaInput v-model="rule.indexName" label="Index Name" placeholder="Enter Index Name" required />
                <!-- Customer ID -->
                <VaInput v-model="rule.customerId" label="Customer ID" placeholder="Enter Customer ID" required />
                <!-- Enabled Toggle -->
                <VaSwitch v-model="rule.enabled" label="Enabled" />

                <!-- Exact Match (comma-separated values) -->
                <VaInput v-model="exactMatchInput" label="Exact Match"
                    placeholder="Enter exact matches, separated by commas" @blur="handleExactMatchInput" />

                <!-- Submit Button -->
                <VaButton type="submit" color="primary" class="submit-btn">
                    Save Rule
                </VaButton>
            </div>
        </VaForm>

        <h3 class="mt-5">Rules List</h3>

        <!-- Rule List Table with Pagination -->
        <VaDataTable :items="rules" :columns="columns" :per-page.sync="pageSize" :page.sync="currentPage"
            :pagination="true" class="rules-table" />

        <!-- Pagination controls -->
        <VaSelect v-model="pageSize" :options="pageSizeOptions" label="Page Size" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VaForm, VaInput, VaSwitch, VaButton, VaDataTable, VaSelect } from 'vuestic-ui';
import { useFetch } from "../../../util/useFetch.js"


// Reactive rule object for form
const rule = ref({
    ruleId: '',
    indexName: '',
    customerId: '',
    enabled: false,
    exactMatch: [],
    consequences: [],
    ruleConditions: [],
    context: [],
});

// Temporary exactMatch input (comma-separated)
const exactMatchInput = ref('');

// Rules list data
const rules = ref([]);

// Pagination settings
const currentPage = ref(0);
const pageSize = ref(10);
const pageSizeOptions = [10, 20, 50];

// Table columns configuration
const columns = [
    { key: 'serial', label: 'Serial No.' },
    { key: 'ruleId', label: 'Rule ID' },
    { key: 'indexName', label: 'Index Name' },
    { key: 'customerId', label: 'Customer ID' },
    { key: 'enabled', label: 'Enabled' },
    { key: 'actions', label: 'Actions' },
];

// Fetch rules when component is mounted
onMounted(async () => {
    await fetchRules();
});

const apiPrefix = process.env.VUE_APP_API_PREFIX;


// Fetch all rules from the API
const fetchRules = async () => {
    var apiKey = localStorage.getItem('api-key');
    if (!apiKey || apiKey == undefined) {
        alert("Please set API key shared with you in mail")
    }
    var requestObj = new Request(
        apiPrefix + `/auth/admin/manage/rule?page=` + currentPage.value + `&size=` + pageSize.value,
        {
            method: "GET",
            headers: {
                "API_KEY": apiKey,
                "Content-Type": "application/json",
            },
        }
    );
    const response = useFetch(requestObj);
    rules.value = response.content.map((rule, index) => ({
        serial: index + 1,
        ...rule,
    }));
};

// Handle form submission
const handleFormSubmit = async () => {
    await fetch('/auth/admin/manage/rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule.value),
    });
    await fetchRules();
};

// Handle exact match input (convert to array)
const handleExactMatchInput = () => {
    rule.value.exactMatch = exactMatchInput.value.split(',').map((match) => match.trim());
};
</script>

<style scoped>
.rule-management-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.submit-btn {
    grid-column: span 2;
    justify-self: center;
}

.rules-table {
    margin-top: 20px;
    width: 100%;
}
</style>