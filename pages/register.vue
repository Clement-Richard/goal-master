<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-6 rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4 text-center">Inscription</h1>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="username" class="block text-gray-600"
            >Nom d'utilisateur</label
          >
          <input
            type="text"
            v-model="formData.username"
            id="username"
            name="username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Adresse e-mail</label>
          <input
            type="email"
            v-model="formData.email"
            id="email"
            name="email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Mot de passe</label>
          <input
            type="password"
            v-model="formData.password"
            id="password"
            name="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
  username: "",
});

const register = async () => {
  try {
    const response = await fetch(
      "http://skymunt.fr:3000/api/goalMaster/accounts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value),
      }
    );

    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Erreur lors de la requête POST :", response.statusText);
    }
  } catch (error) {
    console.error("Erreur lors de la requête POST :", error);
  }
};
</script>
