<template>
    <div class="hero">
        <!-- Left Column: Text Section -->
        <div class="column">
            <div class="va-h1">Lightning-fast Search</div>
            <div class="va-h6">No PhD required.</div>
            <VaList>
                <VaListItem v-for="(feature, index) in features" :key="index" class="list__item">
                    <VaListItemSection avatar>
                        <VaIcon class="material-icons">
                            check
                        </VaIcon>
                    </VaListItemSection>
                    <VaListItemSection>
                        <VaListItemLabel>
                            <b>{{ feature.name }}</b>
                        </VaListItemLabel>
                    </VaListItemSection>
                </VaListItem>
            </VaList>
        </div>

        <!-- Right Column: Auto-Suggest Search -->
        <div class="column search-container">
            <h3>Try it out</h3>
            <input type="text" v-model="searchQuery" placeholder="Search..." @input="handleSearch" class="search-box" />
            <ul class="suggestions-list">
                <li v-for="i in 5" :key="i" ref="suggestionItems">{{ suggestions[i - 1] || '' }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            suggestions: [],
            features: [
                { name: "Search-as-you-type" },
                { name: "Autocomplete" },
                { name: "Fuzzy Search" },
                { name: "Recommendations" },
            ],
        };
    },
    methods: {
        async handleSearch() {
            const apiPrefix = process.env.VUE_APP_API_PREFIX;

            // Clear previous suggestions from DOM
            this.clearSuggestions();

            if (this.searchQuery.trim() === '') {
                this.clearSuggestions();
                return;
            }

            try {
                const response = await fetch(apiPrefix + 'auth/api/v1/search', {
                    method: 'POST',
                    headers: {
                        'API_KEY': 'd4b719f6-02b9-4ae1-bc0a-1b4d83eedba2', // Replace with your actual API key
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        indexName: 'search_products',
                        queryTerm: this.searchQuery,
                        searchableFields: ['product.name'],
                        size: 5,
                        filters: []
                    })
                });

                const data = await response.json();
                // Assuming the API returns results in data.hits
                this.suggestions = data.data.hits.map(hit => hit.product.name).slice(0, 5);

            } catch (error) {
                console.error('Error fetching suggestions:', error);
                this.clearSuggestions();
            }
        },
        clearSuggestions() {
            this.suggestions = [];
        }
    }
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

.search-box {
    padding: 10px;
    font-size: 1.2em;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.suggestions-list {
    margin-top: 10px;
    list-style: none;
    padding: 0;
}

.suggestions-list li {
    padding: 5px;
    background: transparent;
    margin-bottom: 5px;
    cursor: pointer;
    font-weight: bold;
    border: 1px solid transparent;
    /* Placeholder for alignment */
    height: 30px
}

.suggestions-list li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>