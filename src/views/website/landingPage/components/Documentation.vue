<template>
    <div class="documentation-page">
        <div class="documentation-page__sidebar">
            <va-list>
                <va-list-item v-for="(component, index) in components" :key="index" @click="selectComponent(index)"
                    :class="{ 'active': index === selectedComponentIndex }">
                    {{ component.name }}
                </va-list-item>
            </va-list>
        </div>
        <div v-if="selectedComponentIndex >= 0" class="documentation-page__content">
            <h1>{{ currentComponent.name }}</h1>
            <div v-html="currentComponent.description"></div>
            <section>
                <h2>API Details</h2>
                <VaDataTable :items="currentComponent.apiDetails" />
            </section>
            <section>
                <h2>Example CURL</h2>
                <pre class="code-block">{{ currentComponent.exampleCurl }}</pre>
            </section>
            <section>
                <h2>Request Body</h2>
                <VaDataTable :items="currentComponent.requestBodyDetails" />
            </section>
            <section>
                <h2>Response Details</h2>
                <VaDataTable :items="currentComponent.responseDetails" />
            </section>
            <section>
                <h2>Possible Response Codes</h2>
                <ul>
                    <li v-for="(code, index) in currentComponent.responseCodes" :key="index">
                        <strong>{{ code.code }}</strong>: {{ code.description }}
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
const apiPrefix = process.env.VUE_APP_API_PREFIX;

export default {
    data() {
        return {
            selectedComponentIndex: 0,
            components: [],
            hardcodedComponents: [
                {
                    name: 'Search API',
                    description: '<p>The Search API provides functionalities to execute search queries.</p>',
                    apiDetails: [
                        { property: 'Method', value: 'POST' },
                        { property: 'Endpoint', value: '/auth/api/v1/search' },
                    ],
                    exampleCurl: `curl -X POST https://api.example.com/auth/api/v1/search \\
  -H 'Content-Type: application/json' \\
  -d '{"query": "example"}'`,
                    requestBodyDetails: [
                        { field: 'query', type: 'string', description: 'Search query term' },
                    ],
                    responseDetails: [
                        { field: 'hits', type: 'array', description: 'List of matching results' },
                    ],
                    responseCodes: [
                        { code: 200, description: 'Success' },
                        { code: 400, description: 'Bad Request' },
                    ],
                },
                {
                    name: 'Ingest API',
                    description: '<p>The Ingest API allows you to upload documents in bulk.</p>',
                    apiDetails: [
                        { property: 'Method', value: 'POST' },
                        { property: 'Endpoint', value: '/auth/api/v1/ingest' },
                    ],
                    exampleCurl: `curl -X POST https://api.example.com/auth/api/v1/ingest \\
  -H 'Content-Type: application/json' \\
  -d '{"documents": [...]}'`,
                    requestBodyDetails: [
                        { field: 'documents', type: 'array', description: 'Array of documents to ingest' },
                    ],
                    responseDetails: [
                        { field: 'status', type: 'string', description: 'Status of the operation' },
                    ],
                    responseCodes: [
                        { code: 201, description: 'Created' },
                        { code: 400, description: 'Bad Request' },
                    ],
                },
            ],
        };
    },
    computed: {
        currentComponent() {
            return this.components[this.selectedComponentIndex] || {};
        },
    },
    methods: {
        async fetchComponents() {
            try {
                const response = await fetch(apiPrefix+'fe/frontend/data?dataKey=DOCUMENTATION_PAGE');
                if (!response.ok) throw new Error('Failed to fetch components');
                this.components = await response.json();
            } catch (error) {
                console.error('Error fetching components:', error);
                this.components = this.hardcodedComponents; // Use fallback data
            }
        },
        selectComponent(index) {
            this.selectedComponentIndex = index;
        },
    },
    created() {
        this.fetchComponents();
    },
};
</script>

<style scoped>
.documentation-page {
    display: flex;
    width: 100%;
}

.documentation-page__sidebar {
    width: 20%;
    background: #f7f8fc;
    border-right: 1px solid #eaecef;
    padding: 1rem;
    overflow-y: auto;
}

.documentation-page__sidebar .active {
    background: #e6f7ff;
    font-weight: bold;
}

.documentation-page__content {
    flex: 1;
    padding: 1.5rem;
}

.code-block {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 4px;
    font-family: monospace;
    overflow-x: auto;
}

section {
    margin-bottom: 2rem;
}
</style>
