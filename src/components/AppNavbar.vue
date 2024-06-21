<template>
  <VaNavbar color="#3D4C58" class="h-24">
    <template #left>
      <VaNavbarItem class="logo">
        <router-link class="link" to="/">LOGO</router-link>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        <router-link class="link" to="/admin">Dashboard</router-link>
      </VaNavbarItem>
      <ProfileDropdown/>
    </template>
  </VaNavbar>
</template>

<script>
  import ProfileDropdown from "@/dropdowns/ProfileDropdown.vue";
  export default{
    components:{
      ProfileDropdown,
    }
  }
</script>
<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
.link {
  color: rgb(249, 249, 249);
}
</style>
