<template>
  <div>
    <h1>Profil de l'utilisateur</h1>
    <div v-if="isLoggedIn">
      <p>
        Nom d'utilisateur :
        {{ user ? user.username : "Chargement en cours..." }}
      </p>
      <!-- Affichez d'autres informations de l'utilisateur ici -->
    </div>
    <div v-else>
      <p>Vous n'êtes pas connecté.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/store/auth.ts";

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
</script>
