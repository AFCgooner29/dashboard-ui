<template>
  <div class="container-home">
    <!-- <AppNavbar /> -->

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="headline">Unlock the Power of Smart Search</h1>
        <p class="sub-headline">Boost your business with AI-powered search and discovery.</p>
        <form class="subscribe-form" @submit.prevent="subscribe">
          <va-input v-model="email" placeholder="Enter your email" />
          <va-button type="submit">Subscribe</va-button>
        </form>
      </div>
    </div>

    <!-- Impact Section -->
    <div class="impact-section">
      <va-card>
        <va-icon name="trending_up" />
        <p>Revenue Growth</p>
      </va-card>
      <va-card>
        <va-icon name="group" />
        <p>Increased Followers</p>
      </va-card>
      <va-card>
        <va-icon name="emoji_events" />
        <p>Positive Impact</p>
      </va-card>
      <va-card>
        <va-icon name="thumb_up" />
        <p>Customer Satisfaction</p>
      </va-card>
    </div>

    <!-- Products Section -->
    <div class="products-section">
      <h2>Our Products</h2>
      <div class="products-list">
        <va-card v-for="product in products" :key="product.id" @click="goToProduct(product.route)">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
        </va-card>
      </div>
    </div>

    <!-- Video Carousel Section -->
    <div class="carousel-section">
      <va-carousel :items="videoUrls">
        <template #default="{ item }">
          <iframe :src="item" frameborder="0" allowfullscreen></iframe>
        </template>
      </va-carousel>
    </div>

    <!-- Footer Section -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import Footer from './components/Footer2.vue';
// import AppNavbar from '../../../components/AppNavbar.vue';

const email = ref('');
const products = ref([
  { id: 1, name: 'Product A', description: 'AI-powered search engine.', route: '/product-a' },
  { id: 2, name: 'Product B', description: 'Advanced analytics tool.', route: '/product-b' },
]);
const videoUrls = ref([
  'https://www.youtube.com/embed/xyz',
  'https://www.youtube.com/embed/abc',
]);

const subscribe = () => {
  console.log(`Subscribed with email: ${email.value}`);
};

const goToProduct = (route) => {
  window.location.href = route;
};
</script>

<style scoped>
.container-home {
  width: 100%;
}

.hero-section {
  background: linear-gradient(to right, #f0f4f8, #ffffff);
  padding: 100px 20px;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;
}

.hero-content h1 {
  font-size: 3rem;
  color: #333;
}

.hero-content p {
  font-size: 1.5rem;
  color: #555;
}

.subscribe-form {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.impact-section,
.products-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 40px 0;
}

.va-card {
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.va-card:hover {
  transform: translateY(-5px);
}

.carousel-section iframe {
  width: 100%;
  height: 300px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
