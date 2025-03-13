<template>
    <VaNavbar color="black" class="navbar">
      <template #left>
        <VaNavbarBrand>
          <RouterLink to="/" class="navbar-brand">Liberta</RouterLink>
        </VaNavbarBrand>
      </template>
  
      <template #right>
        <VaDropdown>
          <template #anchor>
            <VaButton class="nav-button">Our Products</VaButton>
          </template>
          <VaList>
            <VaListItem>
              <RouterLink :to="{ name: 'search-landing' }" class="dropdown-link">
                Smart Search
              </RouterLink>
            </VaListItem>
          </VaList>
        </VaDropdown>
      </template>
    </VaNavbar>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar {
    padding: 0.5rem 1rem;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
  }
  
  .nav-button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 1rem;
    margin-left: 1rem;
  }
  
  .nav-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .link {
    text-decoration: none;
    color: white;
  }
  
  .link:hover {
    color: #0088a9;
  }
  
  .dropdown-link {
    color: #333;
    text-decoration: none;
    display: block;
    padding: 0.5rem 1rem;
  }
  
  .dropdown-link:hover {
    background-color: #f0f0f0;
  }
  </style>