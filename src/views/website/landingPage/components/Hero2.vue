<template>
  <div class="hero-section">
    <va-row align="center" justify="space-between" class="hero-content">
      <!-- Left Column -->
      <va-col cols="12" md="6" class="text-block">
        <h1 class="hero-title">Lightning-fast Search</h1>
        <p class="hero-subtitle">No PhD required.</p>
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
        <va-button class="get-started-btn" @click="onGetStartedClick">
          Get Started
        </va-button>
      </va-col>

      <!-- Right Column -->
      <va-col cols="12" md="6" class="search-container">
        <h3 class="search-title">Try it out</h3>
        <p v-if="!responseTime" class="response-time">Results fetched time will be shown here</p>
        <p v-if="responseTime" class="response-time">Results fetched in {{ responseTime }} ms</p>
        <SuggestionsList :options="suggestions" placeholder="Start typing..." @input="handleSearch" />
      </va-col>
    </va-row>
  </div>
</template>


<script>
import SuggestionsList from '../../../../components/SuggestionsList.vue';

const demoApiKey = process.env.VUE_APP_DEMO_API_KEY;

export default {
  components: { SuggestionsList },
  data() {
    return {
      features: [
        { name: "Search-as-you-type" },
        { name: "Autocomplete" },
        { name: "Fuzzy Search" },
        { name: "Recommendations" },
      ],
      suggestions: [],
      responseTime: null,
      debounceTimeout: null,
    };
  },
  methods: {
    onGetStartedClick() {
      this.$router.push({ name: "authPage" });
    },
    handleSearch(event) {
      // Debounced API call logic remains the same as in the original implementation.
    },
  },
};
</script>


<style scoped>
.hero-section {
  background: linear-gradient(90deg, #b78ed8, #36054a);
  color: white;
  padding: 5% 2%;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.get-started-btn {
  background-color: #ff6f61;
  color: white;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  margin-top: 1rem;
}

.search-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.response-time {
  font-size: 0.9rem;
  color: #ddd;
  margin-bottom: 10px;
}

.list__item+.list__item {
  margin-top: 10px;
}

/* Hover Effect */
.list__item:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
  }

  .get-started-btn {
    width: 100%;
  }
}
</style>
