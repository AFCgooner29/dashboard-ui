<template>
    <div class="hero">
        <!-- Left Column: Text Section -->
        <div class="column">
            <div class="va-h1">Lightning-fast Search</div>
            <div class="va-h6">No PhD required.</div>
            <VaList>
                <VaListItem v-for="(feature, index) in features" :key="index" class="list__item">
                    <VaListItemSection avatar>
                        <VaIcon class="material-icons">check</VaIcon>
                    </VaListItemSection>
                    <VaListItemSection>
                        <VaListItemLabel><b>{{ feature.name }}</b></VaListItemLabel>
                    </VaListItemSection>
                </VaListItem>
            </VaList>
        </div>

        <!-- Right Column: Auto-Suggest Search -->
        <div class="column search-container">
            <h3>Try it out</h3>
            <SuggestionsList :options="suggestions" placeholder="Start typing..." @input="handleSearch"
                />

        </div>
    </div>
</template>

<script>
import SuggestionsList from '../../../../components/SuggestionsList.vue';


const demoApiKey = process.env.VUE_APP_DEMO_API_KEY;

export default {
    components: { SuggestionsList },
    data() {
        return {
            searchQuery: '', // Binds to the VaSelect input value
            suggestions: [], // Array to store autocomplete options
            features: [
                { name: "Search-as-you-type" },
                { name: "Autocomplete" },
                { name: "Fuzzy Search" },
                { name: "Recommendations" },
            ],
        };
    },
    methods: {
        async handleSearch(event) {
            const query = typeof event === 'string' ? event : event?.target?.value || '';
            if (!query) {
                this.suggestions = [];
                return;
            }

            const apiPrefix = process.env.VUE_APP_API_PREFIX;

            try {
                const response = await fetch(apiPrefix + 'auth/api/v1/search', {
                    method: 'POST',
                    headers: {
                        'API_KEY': demoApiKey, // Replace with your actual API key
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        indexName: 'products',
                        queryTerm: query,
                        searchableFields: ['productName'],
                        size: 5,
                        filters: []
                    })
                });

                const data = await response.json();
                this.suggestions = data.data.hits.map(hit => (hit.productName));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                this.suggestions = [];
            }
        },
    },
};
</script>

<style scoped>
.list__item+.list__item {
    margin-top: 20px;
}

.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top: 5%;
    padding-bottom: 10%;
    box-sizing: border-box;
    background: #dcd1e5;
}

.column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-inline: 10%;
}

.search-container {
    position: relative;
    width: 100%;
}

.va-select {
    max-width: 400px;
}
</style>