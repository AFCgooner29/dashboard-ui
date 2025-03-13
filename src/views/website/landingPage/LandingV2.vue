<template>
  <div class="container-home">
    <!-- Show navbar only when NOT in `/smart/search/client` and its subroutes -->
    <AppNavbar v-if="!$route.path.startsWith('/smart/search/client')" />

    <!-- Show these only on the root `/smart/search` -->
    <template v-if="$route.path === '/smart/search'">
      <HeroSection />
      <FeaturesSection />
      <Plans />
      <TestimonialsSection />
      <Footer />
    </template>

    <!-- Add router-view for child routes -->
    <router-view />
  </div>
</template>

<script>
import HeroSection from './components/Hero.vue';
import FeaturesSection from './components/Features.vue';
import TestimonialsSection from './components/Testimonials.vue';
import Plans from './components/Plans.vue';
import Footer from './components/Footer2.vue';
import AppNavbar from '../../../components/AppNavbar.vue';

export default {
  components: {
    HeroSection,
    FeaturesSection,
    Plans,
    TestimonialsSection,
    Footer,
    AppNavbar
  }
};
</script>

<style>
.container-home {
  width: 100%;
}
</style>
