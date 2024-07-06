<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light h-300">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Enable AI</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Pricing</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Contact us</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'login' }" class="nav-link">Log in</RouterLink>
          </li>
        </ul>
        <button class="btn btn-dark ms-3" @click="goToSignUp">Get Started</button>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  methods: {
    goToSignUp() {
      this.$router.push({ name: 'signup' }); 
    }
  }
}
</script>

<style scoped>

.navbar-brand {
  font-size: large;
  font-weight: 1000;
}

.nav-link {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
}

.nav-link:hover {
  color: #0088a9 !important;
}

.btn {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease 0s;
}

.btn:hover {
  background-color: rgba(0, 136, 169, 0.8);
}
</style>
