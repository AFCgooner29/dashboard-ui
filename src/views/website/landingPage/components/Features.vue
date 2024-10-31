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
export default {
  data() {
    return {
      features: [
        {
          title: 'Typo Tolerance',
          description: 'Spelling Mistakes? Not a problem. Automatically correct typos.',
          icon: 'Keyboard Alt',
        },
        {
          title: 'Tunable Ranking',
          description: 'Tailor your results via flexible and fast query-time ranking.',
          icon: 'Rank',
        },
        {
          title: 'Merchandising',
          description: 'Pin specific records to feature or merchandize them.',
          icon: 'Merchandise',
        },
        {
          title: 'Synonyms',
          description: 'Show results for pants when users search for trousers.',
          icon: 'S',
        },
        {
          title: 'Multi-tenant API Keys',
          description: 'Create API keys for each user restricting access to their data.',
          icon: 'API',
        },
        {
          title: 'Dynamic Sorting',
          description: 'Sort records on the fly by any fields like price, popularity, etc.',
          icon: 'Sort',
        },
        {
          title: 'Grouping & Distinct',
          description: 'Group results to provide variety, like combining color variations.',
          icon: 'Group',
        },
        {
          title: 'Filtering & Faceting',
          description: 'Fetch records matching a filter, aggregate field values, and get counts.',
          icon: 'Filter',
        },
        {
          title: 'Geo Search',
          description: 'Search & sort results within a certain distance from a latitude/longitude.',
          icon: 'Location',
        },
        // {
        //   title: 'Federated Search',
        //   description: 'Search one or more collections in a single query.',
        //   icon: '/path/to/federated_search_icon.svg',
        // },
        {
          title: 'Vector & Semantic Search',
          description: 'Automatically generate embeddings and do semantic search.',
          icon: 'Arrow',
        },
        {
          title: 'Easy High Availability',
          description: 'Build a resilient production-grade search service.',
          icon: 'Globe',
        },
      ],
    };
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
  background: linear-gradient(90deg, #ae90c7, #7412c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
