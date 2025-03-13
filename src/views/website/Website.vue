<template>
  <div class="container-website">
    <!-- Only show HomeNavbar on the root `/` route -->
    <HomeNavbar v-if="$route.path === '/'" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import HomeNavbar from "../../components/HomeNavbar.vue";
</script>

<style>
.container-website {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
</style>
