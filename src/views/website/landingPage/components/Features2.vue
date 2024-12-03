<template>
    <div class="features-section">
      <va-row align="center" justify="center">
        <va-col cols="12" md="4" v-for="feature in features" :key="feature.title">
          <va-card>
            <img :src="feature.icon" :alt="feature.title" class="feature-icon" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </va-card>
        </va-col>
      </va-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        features: [
          {
            title: 'Feature 1',
            description: 'Description of feature 1',
            icon: 'feature1-icon.svg',
          },
          {
            title: 'Feature 2',
            description: 'Description of feature 2',
            icon: 'feature2-icon.svg',
          },
          {
            title: 'Feature 3',
            description: 'Description of feature 3',
            icon: 'feature3-icon.svg',
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .features-section {
    padding: 50px 20px;
    background: #f7f9fc;
  }
  .feature-icon {
    width: 5%;
    height: 10%;
    margin-bottom: 2%;
  }
  </style>
  