<template>
  <footer class="footer">
    <va-row align="center" justify="space-between">
      <va-col cols="12" md="6">
        <p>© 2024 Liberta Tech Solutions. All rights reserved.</p>
      </va-col>
      <va-col cols="12" md="6" class="privacy-link">
        <router-link to="/privacy">Privacy Policy</router-link>
      </va-col>
    </va-row>
  </footer>
</template>

<style>
.footer {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
}
.privacy-link {
  text-align: right;
  color: white;
}
.privacy-link a {
  color: white;
  text-decoration: none;
}
.privacy-link a:hover {
  text-decoration: underline;
}
</style>
