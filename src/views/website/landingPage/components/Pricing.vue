<template>
  <section class="pricing-container">
    <div class="cards">
      <div v-for="option in options" :key="option.id">
        <PriceCard :option="option" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PriceCard from "./PriceCard.vue";

const options = ref([
  { id: 1, title: "Basic", price: 19.99, popular: false, features: [
  {"Feature A": true},
  {"Feature B": true},
  {"Feature C": false},
  {"Feature D": false},
  {"Feature E": false},
]},
  { id: 2, title: "Premium", price: 49.99, popular: true,  features: [
  {"Feature A": true},
  {"Feature B": true},
  {"Feature C": true},
  {"Feature D": false},
  {"Feature E": false},
]},
  { id: 3, title: "Enterprise", price: 199.99, popular: false, features: [
  {"Feature A": true},
  {"Feature B": true},
  {"Feature C": true},
  {"Feature D": true},
  {"Feature E": true},
]}
]);
</script>

<style scoped>
::before,
::after {
  box-sizing: border-box;
}
:root {
  --acent-color: #641bff;
  --heading-font-family: "Poppins", sans-serif;
  --body-font-family: "Lato", sans-serif;
}
.pricing-container {
  margin: 0;
  background-color: #f8f9fb;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--body-font-family);
}
.cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin: 1rem;
}

</style>
