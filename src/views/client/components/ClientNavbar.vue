<template>
  <VaNavbar color="primary" class="mb-0">
    <!-- Left Section -->
    <template #left>
      <VaButton class="mr-6 mb-2">
        <RouterLink :to="{ name: 'landing' }" style="color:white; text-decoration:none;">
          Liberta
        </RouterLink>
      </VaButton>
    </template>

    <!-- Right Section (Responsive) -->
    <template #right>
      <!-- Desktop Buttons -->
      <div class="navbar-desktop">
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
      </div>

      <!-- Mobile Dropdown Menu -->
      <div class="navbar-mobile">
        <VaDropdown>
        <template #anchor>
          <VaIcon name="menu" /> 
        </template>

        <VaDropdownContent>
            <VaList>
              <VaListItem
                v-for="button in filteredButtons"
                :key="button.label"
                @click="$router.push({ name: button.routeName })"
              >
                {{ button.label }}
              </VaListItem>
              <VaListItem @click="logout">
                Log Out
              </VaListItem>
            </VaList>
          </VaDropdownContent>
      </VaDropdown>
      </div>
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import navbarConfig from "../clientNavbarConfigs.json";
import { useRouter } from "vue-router";

const router = useRouter();
const userRoles = ref<string[]>([]);
const navbarButtons = ref<any[]>([]);
const filteredButtons = ref<any[]>([]);

const loadUserRoles = () => {
  const roles = localStorage.getItem("userRoles") || "";
  userRoles.value = roles.split(",").map((role) => role.trim());
};

const loadConfig = async () => {
  navbarButtons.value = navbarConfig.navbarButtons || [];
};

const filterButtons = () => {
  filteredButtons.value = navbarButtons.value.filter((button) =>
    button.roles.some((role) => userRoles.value.includes(role))
  );
};

const logout = () => {
  localStorage.clear();
  router.push({ name: "landing" });
};

onMounted(async () => {
  loadUserRoles();
  await loadConfig();
  filterButtons();
});
</script>

<style scoped>
/* Show desktop navbar by default */
.navbar-desktop {
  display: flex;
}

/* Hide mobile menu by default */
.navbar-mobile {
  display: none;
}

/* Media query for small screens */
@media (max-width: 768px) {
  .navbar-desktop {
    display: none;
  }
  .navbar-mobile {
    display: flex;
  }
}
</style>
