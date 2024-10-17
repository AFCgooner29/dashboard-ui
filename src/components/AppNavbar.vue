<template>
  <VaNavbar color="light">
    <template #left>
      <VaNavbarBrand>
      <RouterLink to="/" class="navbar-brand">Enable AI</RouterLink>
    </VaNavbarBrand>
    </template>
    <template #right>
      <!-- <VaNavbarItem>
      <RouterLink to="/" class="nav-link">Pricing</RouterLink>
    </VaNavbarItem>
    <VaNavbarItem>
      <RouterLink to="/" class="nav-link">Contact us</RouterLink>
    </VaNavbarItem>
    <VaNavbarItem>
      <RouterLink :to="{ name: 'login' }" class="nav-link">Log in</RouterLink>
    </VaNavbarItem> -->
    <VaButton color="dark" class="ms-3"><RouterLink :to="{ name: 'client' }" style="color:white; text-decoration:none;">Try Our Products</RouterLink></VaButton>
    </template>
  </VaNavbar>
</template>

<script setup>

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

.ms-3 {
  margin-left: 1rem;
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
