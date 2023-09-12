<template>
  <div class="bg-gray-100 py-8 mb-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold mb-4">Profil de l'utilisateur</h1>
      <div v-if="isLoggedIn" class="bg-white rounded-lg shadow-md p-4">
        <p class="text-lg">
          Nom d'utilisateur :
          <span class="font-semibold">{{
            user ? user.username : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Email :
          <span class="font-semibold">{{
            user ? user.email : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Parties jouées :
          <span class="font-semibold">{{
            user ? user.matchsPlayed : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Parties gagnées :
          <span class="font-semibold">{{
            user ? user.matchsWon : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Parties perdues :
          <span class="font-semibold">{{
            user ? user.matchsLost : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Date de création du compte :
          <span class="font-semibold">{{
            user ? user.createdAt : "Chargement en cours..."
          }}</span>
        </p>
        <p class="text-lg mt-4">
          Date de mise à jour du compte :
          <span class="font-semibold">{{
            user ? user.updatedAt : "Chargement en cours..."
          }}</span>
        </p>
      </div>
      <div v-else class="bg-white rounded-lg shadow-md p-4">
        <p class="text-lg">Vous n'êtes pas connecté.</p>
      </div>
    </div>
  </div>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Liste des joueurs</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-center">Pseudo</th>
          <th class="px-4 py-2 text-center">Email</th>
          <th class="px-4 py-2 text-center">Matches joués</th>
          <th class="px-4 py-2 text-center">Matches gagnés</th>
          <th class="px-4 py-2 text-center">Matches perdus</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="userList in usersList"
          :key="userList.id"
          class="bg-gray-100"
        >
          <td class="px-4 py-2 text-center">{{ userList.username }}</td>
          <td class="px-4 py-2 text-center">{{ userList.email }}</td>
          <td class="px-4 py-2 text-center">{{ userList.matchsPlayed }}</td>
          <td class="px-4 py-2 text-center">{{ userList.matchsWon }}</td>
          <td class="px-4 py-2 text-center">{{ userList.matchsLost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/store/auth.ts";

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
const usersList = ref([]);

const getTabUsers = async () => {
  try {
    const response = await fetch(
      "http://skymunt.fr:3000/api/goalMaster/accounts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      usersList.value = data.res.items;
    } else {
      console.error("La requête a échoué avec le statut :", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête POST :", error);
  }
};
onMounted(() => {
  getTabUsers();
});
</script>
