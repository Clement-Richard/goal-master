<template>
  <!-- Afficher la section "Partie en cours" pour chaque match en cours -->
  <div>
    <h1 class="text-2xl font-semibold mb-4">Matchs de Football en Cours</h1>
    <div v-for="match in inProgressMatches" :key="match.id" class="mb-4">
      <!-- Affichage des scores et noms d'équipes avec couleurs -->
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="text-blue-500 text-4xl mr-2">{{ match.blueScore }}</div>
          <div class="text-red-500 text-4xl">
            {{ match.redScore }}
          </div>
        </div>
        <div>
          <p :class="match.blueTeamColor">
            {{ match.blue1.username }}
            <span v-if="match.blue2"> - {{ match.blue2.username }}</span>
          </p>
          <p :class="match.redTeamColor">
            {{ match.red1.username }}
            <span v-if="match.red2"> - {{ match.red2.username }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Afficher "Il n'y a pas de match en direct" si inProgressMatches est vide -->
  <div v-if="inProgressMatches.length === 0">
    <p>Il n'y a pas de match en direct</p>
  </div>

  <!-- Liste des matchs -->
  <div>
    <h1 class="text-2xl font-semibold mb-4">Liste des Matchs</h1>
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2 text-center">ID Arduino</th>
          <th class="px-4 py-2 text-center">Équipe Bleue</th>
          <th class="px-4 py-2 text-center">Buts Bleus</th>
          <th class="px-4 py-2 text-center">Équipe Rouge</th>
          <th class="px-4 py-2 text-center">Buts Rouges</th>
          <th class="px-4 py-2 text-center">Date de création</th>
          <th class="px-4 py-2 text-center">Partie Terminée</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in matchesList" :key="match.id">
          <td class="px-4 py-2 text-center">{{ match.arduinoId }}</td>
          <td class="px-4 py-2 text-center">
            {{ match.blue1.username }}
            <span v-if="match.blue2"> - {{ match.blue2.username }}</span>
          </td>
          <td class="px-4 py-2 text-center">{{ match.blueScore }}</td>
          <td class="px-4 py-2 text-center">
            {{ match.red1.username }}
            <span v-if="match.red2"> - {{ match.red2.username }}</span>
          </td>
          <td class="px-4 py-2 text-center">{{ match.redScore }}</td>
          <td class="px-4 py-2 text-center">{{ match.createdAt }}</td>
          <td class="px-4 py-2 text-center">
            {{ match.hasEnded ? "Oui" : "Non" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-center">
      <button
        class="px-4 py-2 bg-blue-500 text-white mr-2"
        @click="previousPage"
        :disabled="pageNumber === 1"
      >
        Précédent
      </button>
      <button
        class="px-4 py-2 bg-blue-500 text-white"
        @click="nextPage"
        :disabled="pageNumber === totalPages"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
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
