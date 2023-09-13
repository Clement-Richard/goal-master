<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-xl rounded-lg p-4 mb-4">
      <h1 class="text-2xl font-semibold mb-4 text-slate-600">
        Matchs de Babyfoot en Cours
      </h1>
      <!-- Afficher la section "Partie en cours" pour chaque match en cours -->
      <section v-if="inProgressMatches.length > 0">
        <div class="mb-4">
          <div v-for="match in inProgressMatches" :key="match.id" class="mb-4">
            <!-- Affichage des scores et noms d'équipes avec couleurs -->
            <div
              class="bg-white shadow-md rounded-lg p-4 flex align-middle justify-center"
            >
              <div class="justify-center align-middle">
                <div class="flex justify-center items-center">
                  <p :class="match.blueTeamColor" class="text-lg font-semibold">
                    <span class="text-blue-500">{{
                      match.blue1.username
                    }}</span>
                    <span v-if="match.blue2"
                      >ET
                      <span class="text-blue-500">{{
                        match.blue2.username
                      }}</span></span
                    >
                  </p>
                  <span class="text-lg font-semibold mx-2">-</span>
                  <p
                    :class="match.redTeamColor"
                    class="text-lg font-semibold hover:text-red-800 transition-colors"
                  >
                    <span class="text-red-500">{{ match.red1.username }}</span>
                    <span v-if="match.red2"
                      >ET
                      <span class="text-red-500">{{
                        match.red2.username
                      }}</span></span
                    >
                  </p>
                </div>
                <div
                  class="text-2xl font-semibold justify-center flex items-center"
                >
                  {{ match.blueScore }} - {{ match.redScore }}
                </div>
                <div class="justify-center flex items-center">
                  <button
                  class="py-2 ml-1 mt-2 mr-1 px-4 w-36 text-white bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-lg transform hover:scale-105 hover:shadow-md transition-transform duration-300"
                  :disabled="true"
                >
                  Voir en Direct
                </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-else>
        <p class="text-gray-600">Aucun match en cours.</p>
      </section>
    </div>
    <div class="bg-white shadow-xl rounded-lg p-4 mb-4 mt-2">
      <h1 class="text-2xl font-semibold mb-4 text-slate-600">
        Historique des Matchs
      </h1>
      <div class="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead>
            <tr class="bg-gray-200 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left text-blue-600">Équipe Bleue</th>
              <th class="py-3 px-6 text-center text-blue-600">Buts Bleus</th>
              <th class="py-3 px-6 text-left text-red-600">Équipe Rouge</th>
              <th class="py-3 px-6 text-center text-red-600">Buts Rouges</th>
              <th class="py-3 px-6 text-center">Date de création</th>
              <th class="py-3 px-6 text-center">Partie Terminée</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-for="match in matchesList" :key="match.id">
              <td class="py-3 px-6 text-left">
                <span
                  class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full hover:text-blue-800 transition-colors"
                >
                  {{ match.blue1.username }}
                </span>
                <span
                  v-if="match.blue2"
                  class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full ml-2 hover:text-blue-800 transition-colors"
                >
                  {{ match.blue2.username }}
                </span>
              </td>
              <td class="py-3 px-6 text-center">{{ match.blueScore }}</td>
              <td class="py-3 px-6 text-left">
                <span
                  class="bg-red-200 text-red-600 py-1 px-3 rounded-full hover:text-red-800 transition-colors"
                >
                  {{ match.red1.username }}
                </span>
                <span
                  v-if="match.red2"
                  class="bg-red-200 text-red-600 py-1 px-3 rounded-full ml-2 hover:text-red-800 transition-colors"
                >
                  {{ match.red2.username }}
                </span>
              </td>
              <td class="py-3 px-6 text-center">{{ match.redScore }}</td>
              <td class="py-3 px-6 text-center">
                {{ formatDate(match.createdAt) }}
              </td>
              <td class="py-3 px-6 text-center">
                <span
                  v-if="match.hasEnded"
                  class="bg-green-200 text-green-600 py-1 px-3 rounded-full hover:text-green-800 transition-colors"
                  >Oui</span
                >
                <span
                  v-else
                  class="bg-red-200 text-red-600 py-1 px-3 rounded-full hover:text-red-800 transition-colors"
                  >Non</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-4 flex justify-center">
      <button
        class="py-2 ml-1 mr-1 px-4 w-28 text-white bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-lg transform hover:scale-105 hover:shadow-md transition-transform duration-300"
        @click="previousPage"
        :disabled="pageNumber === 1"
      >
        Précédent
      </button>
      <button
        class="py-2 ml-1 mr-1 px-4 w-28 text-white bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-lg transform hover:scale-105 hover:shadow-md transition-transform duration-300"
        @click="nextPage"
        :disabled="pageNumber === totalPages"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const matchesList = ref([]);
const inProgressMatches = ref([]);
const pageSize = 10;
let pageNumber = ref(1);
let totalPages = ref(0);

const getTabMatchs = async () => {
  try {
    const response = await fetch(
      `http://skymunt.fr:3000/api/goalMaster/matchs?limit=${pageSize}&pageNumber=${pageNumber.value}&sortOrder=desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      matchesList.value = data.res.items;
      totalPages.value = data.res.totalPages;
    } else {
      console.error("La requête a échoué avec le statut :", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête POST :", error);
  }
};

const previousPage = () => {
  if (pageNumber.value > 1) {
    pageNumber.value -= 1;
    getTabMatchs();
  }
};

const nextPage = () => {
  if (pageNumber.value < totalPages.value) {
    pageNumber.value += 1;
    getTabMatchs();
  }
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};

const checkGameInProgress = async () => {
  try {
    const response = await fetch(
      `http://skymunt.fr:3000/api/goalMaster/matchs?limit=10&pageNumber=0&filter=hasEnded&value=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      inProgressMatches.value = data.res.items;
    } else {
      console.error("La requête a échoué avec le statut :", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête POST :", error);
  }
};

const refreshInProgressMatches = () => {
  checkGameInProgress();
};

const intervalId = setInterval(refreshInProgressMatches, 5000);

onMounted(() => {
  getTabMatchs();
  checkGameInProgress();
  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
});
</script>

<style scoped>
/* Ajoutez ici vos styles CSS personnalisés */
</style>
