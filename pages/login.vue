<template>
  <!-- Votre template reste inchangé -->
  <div>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Mot de passe" type="password" />
    <button @click="performLogin">Connexion</button>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.ts";

const { login } = useAuthStore();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function performLogin() {
  try {
    await login({ email: email.value, password: password.value });
    console.log("connexion ok");
  } catch (error) {
    console.log(error.message);
  }
}
</script>
