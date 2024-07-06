<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <RouterLink class="navbar-brand client-navbar-logo" :to="{ name: 'Website' }">Enable AI</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item hidden-sm">
                        <RouterLink class="nav-link" :to="{ name: 'clientdashboard' }">Dashboard</RouterLink>
                    </li>
                    <li class="nav-item hidden-sm">
                        <RouterLink class="nav-link" :to="{ name: 'chat' }">Chat</RouterLink>
                    </li>
                    <li class="nav-item hidden-sm">
                        <RouterLink class="nav-link" :to="{ name: 'clientsettings' }">Settings</RouterLink>
                    </li>
                </ul>
            </div>
            <button class="btn btn-dark ms-3" @click="goToSignUp">Log out</button>
        </div>
    </nav>
</template>

<script setup>
import { computed } from "vue";


</script>

<style scoped>
.client-navbar-logo {
    font-weight: 600;
    font-size: 1.5rem;
}

.hidden-sm {
    display: none;
}

@media (min-width: 576px) {
    .hidden-sm {
        display: block;
    }
}
</style>