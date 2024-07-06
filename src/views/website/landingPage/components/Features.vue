<template>
  <div class="feature-container">
    
    <div class="feature-header">
      <div class="custom-key-features">Key Features</div>
      <h1 class="heading">Powerful AI Capabilities at Your Fingertips</h1>
      <h4>
        Our AI SaaS solution offers a wide range of features to streamline your
        business operations and drive innovation.
      </h4>
    </div>
    <div class="feature-body">
      <div class="feature-list">
        <div v-for="feature in features" :key="feature.id" class="feature">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.body }}</p>
        </div>
      </div>
      <div class="feature-graphic">
        <img :src="featureImage" width="550" height="310" alt="Feature" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import featureImage from "../../../../assets/feature-image-landing-page.jpeg";
const features = ref([
  {
    id: 1,
    title: "Automated Workflows",
    body: "Streamline your business processes with our AI-powered automation tools.",
  },
  {
    id: 2,
    title: "Predictive Analytics",
    body: "Gain valuable insights and make data-driven decisions with our advanced analytics.",
  },
  {
    id: 3,
    title: "Natural Language Processing",
    body: "Leverage AI to understand and respond to natural language inputs.",
  },
]);
</script>
<style>
.feature-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
.custom-key-features {
  display: inline-block; /* inline-block */
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #4b4b4b; /* bg-muted (you might need to adjust the color) */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  font-size: 0.875rem; /* text-sm */
  color: white;
  margin-bottom: 20px;
}
.feature-header {
  box-sizing: border-box;
  width:55%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 30px;
}
.feature-header h1 {
  font-weight: 750;
}

.feature-body {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}
.feature {
  width: 450px;
}
.feature-graphic img {
  border-radius: 60px;
}
</style>
