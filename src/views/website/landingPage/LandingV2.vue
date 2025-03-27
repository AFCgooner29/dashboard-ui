<template>
  <div class="container-home">
    <HeroSection />
    <FeaturesSection />
    <Plans />
    <TestimonialsSection />
    <Footer />
  </div>
</template>

<script>
import HeroSection from './components/Hero.vue';
import FeaturesSection from './components/Features.vue';
import TestimonialsSection from './components/Testimonials.vue';
import Plans from './components/Plans.vue';
import Footer from './components/Footer2.vue';

export default {
  components: {
    HeroSection,
    FeaturesSection,
    Plans,
    TestimonialsSection,
    Footer,
  },
};
</script>

<style>
.container-home {
  width: 100%;
}
</style>