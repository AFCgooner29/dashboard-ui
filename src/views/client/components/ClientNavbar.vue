<template>
  <VaNavbar color="primary" class="mb-0">
    <template #left>
      <VaButton class="mr-6 mb-2">
        <RouterLink :to="{ name: 'landing' }" style="color:white; text-decoration:none;">
          Liberta Tech
        </RouterLink>
      </VaButton>
    </template>
    <template #right>
      <VaNavbarItem v-for="button in filteredButtons" :key="button.label">
        <VaButton class="mr-6 mb-2">
          <RouterLink :to="{ name: button.routeName }" style="color:white; text-decoration:none;">
            {{ button.label }}
          </RouterLink>
        </VaButton>
      </VaNavbarItem>
      <VaNavbarItem key="logout">
        <VaButton class="mr-6 mb-2" @click="logout">
          Log Out
        </VaButton>
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import navbarConfig from '../clientNavbarConfigs.json';
import { useRouter } from "vue-router";

// Initialize router at the top level of the script setup
const router = useRouter();

const userRoles = ref<string[]>([]); // Roles from localStorage
const navbarButtons = ref<any[]>([]); // Buttons from config.json
const filteredButtons = ref<any[]>([]);

// Load roles from localStorage
const loadUserRoles = () => {
  const roles = localStorage.getItem("userRoles") || ""; // Example: "admin,user"
  userRoles.value = roles.split(",").map(role => role.trim());
};

// Load config.json dynamically
const loadConfig = async () => {
  navbarButtons.value = navbarConfig.navbarButtons || [];
};

// Filter buttons based on roles
const filterButtons = () => {
  filteredButtons.value = navbarButtons.value.filter(button =>
    button.roles.some(role => userRoles.value.includes(role))
  );
};

// Logout method
const logout = () => {
  // Clear all user-related data from localStorage
  localStorage.clear()
  // Optionally clear additional session-related data
  // localStorage.clear(); // Use if you want to remove all localStorage data

  // Redirect user to the login or landing page
  router.push({ name: "landing" }); // Replace 'authPage' with the actual login route name
};

// Load and filter buttons on mount
onMounted(async () => {
  loadUserRoles();
  await loadConfig();
  filterButtons();
});
</script>

<style scoped>
/* Add your styles if necessary */
</style>
