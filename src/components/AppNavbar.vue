<template>
  <VaNavbar color="primary">
    <template #left>
      <VaNavbarBrand>
        <RouterLink to="/" class="navbar-brand">Liberta</RouterLink>
      </VaNavbarBrand>
    </template>
    <template #right>
      <VaButton class="ms-3">
          <RouterLink :to="{ name: 'documentation' }" style="color:white; text-decoration:none;">
            Documentation
          </RouterLink>
        </VaButton>
      <template v-if="!sessionToken">
        <VaButton class="ms-3">
          <RouterLink :to="{ name: 'authPage' }" style="color:white; text-decoration:none;">
            Log in
          </RouterLink>
        </VaButton>
      </template>
      <template v-else>
        <VaButton class="ms-3">
          <RouterLink :to="{ name: 'client' }" style="color:white; text-decoration:none;">
            Our Products
          </RouterLink>
        </VaButton>
        <VaButton class="ms-3" @click="logout">
            Log Out
        </VaButton>
      </template>
    </template>
  </VaNavbar>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Reactive property to hold the session token
const sessionToken = ref(null);
// Logout method
const logout = () => {
  // Clear all user-related data from localStorage
  localStorage.clear();
  // Optionally clear additional session-related data
  // localStorage.clear(); // Use if you want to remove all localStorage data

  // Redirect user to the login or landing page
  setTimeout(() => {
        window.location.reload(); // Force a page reload
      }, 100);
};
// Check localStorage for sessionToken on component mount
onMounted(() => {
  sessionToken.value = localStorage.getItem("userSession");
});
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
  background-color: rgb(45, 43, 48);
}
</style>
