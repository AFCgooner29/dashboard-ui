<template>
  <AppNavbar />
  <div class="container-website">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from "../../components/AppNavbar.vue";
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
