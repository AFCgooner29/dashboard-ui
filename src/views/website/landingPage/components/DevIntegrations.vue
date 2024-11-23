<template>
  <div class="dev-integration-container">
    <h2 class="text-center text-gradient-2">
      <b>Easy RESTful Developer Experience</b>
    </h2>
    <div class="text-center subtitle">
      <b>Zero to Instant-Search, in 30 seconds 🚀</b>
    </div>
    <pre class="va-code-snippet">
      curl --location 'localhost:9000/auth/api/v1/search' \
      --header 'API_KEY: YOUR_API_KEY' \
      --header 'Content-Type: application/json' \
      --data '{
          "indexName" : "search_products",
          "queryTerm" : "clay pot",
          "searchableFields" : ["product.name", "product.brand"],
          "size" : 1,
          "filters" : [
              {
                  "key" : "categoryName",
                  "value" : "KidsToys"
              }
          ]
      }'
    </pre>
  </div>
</template>

<script>
export default {
  name: 'CodeTabs',
};
</script>

<style scoped>
.dev-integration-container {
  max-width: 90%;
  margin: 5% auto;
  padding: 0 10%; /* Add horizontal padding for smaller screens */
  box-sizing: border-box;
}

.text-gradient-2 {
  background: linear-gradient(90deg, #ae90c7, #7412c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem; /* Adjust font size */
}

.subtitle {
  font-size: 1.2rem;
  margin-top: 10px;
}

.va-code-snippet {
  padding: 15px;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  white-space: pre-wrap; /* Allow line wrapping on smaller screens */
  overflow-x: auto; /* Horizontal scroll for code overflow */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .text-gradient-2 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .va-code-snippet {
    font-size: 0.8rem; /* Slightly reduce font size for code */
  }

  .dev-integration-container {
    padding: 0 5%; /* Reduce padding on smaller screens */
  }
}

@media (max-width: 480px) {
  .text-gradient-2 {
    font-size: 1.2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .va-code-snippet {
    font-size: 0.7rem;
  }

  .dev-integration-container {
    padding: 0 3%;
  }
}
</style>
