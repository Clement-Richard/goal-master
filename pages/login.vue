<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-6 rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4 text-center">Connexion</h1>
      <form @submit.prevent="performLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            required
            placeholder="Entrez votre email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Entrez votre mot de passe"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="py-2 ml-1 mt-2 mr-1 px-4 w-36 text-white bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-lg transform hover:scale-105 hover:shadow-md transition-transform duration-300"
          >
            Connexion
          </button>
        </div>
      </form>
      <p class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
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
    navigateTo("/");
  } catch (error) {
    console.log(error.message);
  }
}
</script>
