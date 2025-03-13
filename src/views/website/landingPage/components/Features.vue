<template>
  <div class="container mt-xxl-5">
    <!-- Title -->
    <h2 class="text-center text-gradient-2">
      <b>Features you love, minus the complexity</b>
    </h2>
    <!-- Subtitle -->
    <div class="text-center">
      <b>Neatly wrapped in an intuitive RESTful API</b>
    </div>

    <!-- Features Grid -->
    <div class="grid mt-5">
      <VaCard v-for="feature in features" :key="feature.title" class="feature" flat>
        <!-- <VaIcon class="material-icons">
          {{ feature.icon }}
        </VaIcon> -->
        <h5 class="mb-2"><b>{{ feature.title }}</b></h5>
        <p class="description">{{ feature.description }}</p>
      </VaCard>
    </div>
  </div>
</template>

<script>
const apiPrefix = process.env.VUE_APP_API_PREFIX;

export default {
    data() {
        return {
            features: [],
            hardcodedfeatures: [
        {
          title: 'Typo Tolerance',
          description: 'Automatically corrects typos to ensure accurate results.',
          icon: 'Keyboard Alt',
        },
        {
          title: 'Tunable Ranking',
          description: 'Customize search rankings for precise, query-time control.',
          icon: 'Rank',
        },
        {
          title: 'Context-based Rules',
          description: 'Boost, hide, filter, or pin products based on user context.',
          icon: 'Merchandise',
        },
        {
          title: 'Smart Synonyms',
          description: 'Match user queries with synonymous terms for better results.',
          icon: 'S',
        },
        {
          title: 'Multi-tenant API Keys',
          description: 'Secure access with customer-specific API keys.',
          icon: 'API',
        },
        {
          title: 'Dynamic Sorting',
          description: 'Instantly sort results by fields like price or popularity.',
          icon: 'Sort',
        },
        {
          title: 'Smart Filters',
          description: 'Empower users to easily refine their searches.',
          icon: 'Sort',
        },
        // {
        //   title: 'Smart Reranking',
        //   description: 'Leverage analytics to prioritize results and boost revenue.',
        //   icon: 'Filter',
        // },
        {
          title: 'Filtering & Faceting',
          description: 'Fetch and filter records effortlessly for refined results.',
          icon: 'Filter',
        },
        {
          title: 'Relevance Pruning',
          description: 'Eliminate low-value results to deliver high-quality matches.',
          icon: 'Filter',
        },
        // {
        //   title: 'AI-Generated Synonyms',
        //   description: 'Enhance relevance with AI-driven synonym suggestions.',
        //   icon: 'Filter',
        // },
        // {
        //   title: 'AI-Generated Rules',
        //   description: 'Boost relevance with smart, AI-generated rules.',
        //   icon: 'Filter',
        // },
        {
          title: 'Browse API',
          description: 'Create immersive and engaging browsing experiences.',
          icon: 'Filter',
        },
        {
          title: 'Vector & Semantic Search',
          description: 'Use embeddings for advanced semantic search capabilities.',
          icon: 'Arrow',
        },
        {
          title: 'Easy High Availability',
          description: 'Ensure resilience with a production-grade search service.',
          icon: 'Globe',
        },
      ],

        };
    },
    methods: {
        async fetchComponents() {
            try {
                const response = await fetch(apiPrefix+'fe/frontend/data?dataKey=FEATURES_PAGE');
                if (!response.ok) throw new Error('Failed to fetch features');
                this.features = await response.json();
            } catch (error) {
                console.error('Error fetching features:', error);
                this.features = this.hardcodedfeatures; // Use fallback data
            }
        },
    },
    created() {
        this.fetchComponents();
    },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.feature {
  text-align: center;
}

.text-gradient-2 {
  background: linear-gradient(90deg, #757575 40%, #1b1b1b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
