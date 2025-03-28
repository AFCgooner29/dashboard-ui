<template>
    <div class="hero">
        <!-- Left Column: Text Section -->
        <div class="column col-6 col-sm-12 white-text">
            <div class="va-h1">Lightning-fast Search</div>
            <div class="va-h6">No PhD required.</div>
            <VaList>
                <VaListItem v-for="(feature, index) in features" :key="index" class="list__item">
                    <VaListItemSection avatar>
                        <VaIcon class="material-icons">check</VaIcon>
                    </VaListItemSection>
                    <VaListItemSection>
                        <VaListItemLabel><b class="white-text">{{ feature.name }}</b></VaListItemLabel>
                    </VaListItemSection>
                </VaListItem>
            </VaList>
            <VaButton class="contact-btn" @click="showContactModal = !showContactModal">Connect with Us</VaButton>
        </div>

        <!-- Right Column: Auto-Suggest Search -->
        <div class="column search-container col-6 col-sm-12">
            <!-- <h3 class="white-text">Try it out</h3> -->
            <img src="../../../../assets/try_it_out.svg">
            <p v-if="!responseTime" class="response-time white-text">
                Results fetched duration
            </p>
            <p v-if="responseTime" class="response-time white-text">
                Results fetched in {{ responseTime }} ms
            </p>
            <SuggestionsList :options="suggestions" placeholder="Start typing..." @input="handleSearch" />
        </div>
    </div>
    <!-- Contact Modal -->
    <ContactModal v-model="showContactModal"/>
</template>


<script>
import { VaButton } from 'vuestic-ui/web-components';
import SuggestionsList from '../../../../components/SuggestionsList.vue';
import ContactModal from '../components/ContactModal.vue';

export default {
    components: { SuggestionsList, ContactModal },
    data() {
        return {
            showContactModal: false,
            searchQuery: '', // Binds to the VaSelect input value
            suggestions: [], // Array to store autocomplete options
            responseTime: null, // To store the query time from the API
            debounceTimeout: null, // Timeout ID for debouncing
            features: [
                { name: "Search-as-you-type" },
                { name: "Autocomplete" },
                { name: "Typo Tolerance" },
                { name: "Recommendations" },
            ],
        };
    },
    methods: {
        handleSearch(event) {
            const query = typeof event === 'string' ? event : event?.target?.value || '';

            // Clear previous timeout if exists
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            // Set a new timeout
            this.debounceTimeout = setTimeout(async () => {
                // Ensure query is still valid after debounce
                if (!query) {
                    this.suggestions = [];
                    this.responseTime = null;
                    return;
                }

                const apiPrefix = process.env.VUE_APP_API_PREFIX;

                try {
                    const response = await fetch(apiPrefix + 'api/demo/autocomplete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            queryTerm: query,
                            size: 5,
                        })
                    });

                    const data = await response.json();
                    this.suggestions = data.data.hits.map(hit => hit.queryTerm);
                    this.responseTime = data.data.queryTime; // Extract queryTime from API response
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    this.suggestions = [];
                    this.responseTime = null;
                }
            }, 400); // Set debounce duration (e.g., 300ms)
        },
    },
};
</script>


<style scoped>
.response-time {
    font-size: 0.7rem;
    color: #555;
    margin-bottom: 10px;
}

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
    background: linear-gradient(173deg, #000e35, #000e35 28%, #000e35 43%, #080d17 56%, #000 78%, #fff calc(78% + 4px));
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

.white-text {
    color: #ffffff;
}

.va-select {
    max-width: 400px;
}

.black-text {
    color: black;
}

.contact-btn {
    margin-top: 10%;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-left: 5%;
        padding-right: 5%;
        gap: 30px;
        margin-bottom: 10%;
        background: linear-gradient(173deg, #000e35, #000e35 28%, #000e35 43%, #080d17 56%, #000 78%);
        height: 700px;
    }

    .column {
        padding: 0;
        width: 100%;
    }

    .text-column {
        align-items: center;
    }

    .va-h1,
    .va-h6 {
        text-align: center;
    }

    .search-container {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .va-h1 {
        font-size: 1.5rem;
    }

    .va-h6 {
        font-size: 1rem;
    }
}
</style>
