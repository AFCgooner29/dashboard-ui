<template>
  <div class="product-card-container">
    <VaCard v-for="product in products" :key="product.id" class="product-card" @click="goToClientPage(product.link)"
      outlined hover>
      <h3>{{ product.name }}</h3>
      <VaCardContent>
        <p>{{ product.description }}</p>
        <li v-for="feature in product.features">
          {{ feature }}
        </li>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Sample products data
const products = ref([
  {
    id: 1,
    name: "AI-Powered Search & Discovery",
    description:
      "Enhance product discovery within your app and increase add-to-cart rates and cart values with our AI-powered search engine.",
    features: [
      "Smart, intuitive search",
      "Personalized product suggestions",
      "Seamless integration with your app"
    ],
    link: "/client/searchplayground",
  },
  {
    id: 2,
    name: "AI Chatbot – Intelligent Customer Support",
    description:
      "Our AI Chatbot uses your business domain data to derive meaningful responses for customer queries, improving efficiency and satisfaction.",
    features: [
      "Automated Customer Support",
      "Domain-Specific Intelligence",
      "24/7 Availability"
    ],
    link: "/client/chat",
  },
]);

// Vue Router
const router = useRouter();
const goToClientPage = (link) => {
  router.push(link);
};
</script>

<style scoped>
.product-card-container {
  display: flex;
  justify-content: space-between;
  /* Ensure space between the cards */
  align-items: stretch;
  /* Make sure all cards have the same height */
  gap: 20px;
  /* Space between cards */
  padding: 20px;
}

.product-card {
  flex: 1;
  /* Make sure each card takes equal space */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-card:hover {
  background-color: #a7a7a7;
}

.product-card h3 {
  margin: 10px;
  color: #333;
}

.product-card p {
  color: inherit;
}
</style>
