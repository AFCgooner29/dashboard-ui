<template>
  <AppNavbar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
  import AppNavbar from "./components/AppNavbar.vue";
  export default{
    components:{
      AppNavbar,
    }
  }
</script>
<style>
.container{
  display: flex;
  justify-content: center;
}
</style>