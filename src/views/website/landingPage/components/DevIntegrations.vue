<template>
  <div class="dev-integration-container">
    <h2 class="text-center text-gradient-2">
      <b>Easy RESTful Developer Experience</b>
    </h2>
    <div class="text-center">
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
  name: 'CodeTabs'
}
</script>

<style>

.dev-integration-container {
  max-width: 1200px;
  margin-top: 5%;
}

.text-gradient-2 {
  background: linear-gradient(90deg, #ae90c7, #7412c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>