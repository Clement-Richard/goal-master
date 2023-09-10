<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
      <h2 class="text-2xl font-semibold mb-4">Inscription</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold"
            >Nom d'utilisateur</label
          >
          <input
            type="text"
            v-model="formData.username"
            id="username"
            name="username"
            class="form-input mt-1"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold"
            >Adresse e-mail</label
          >
          <input
            type="email"
            v-model="formData.email"
            id="email"
            name="email"
            class="form-input mt-1"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold"
            >Mot de passe</label
          >
          <input
            type="password"
            v-model="formData.password"
            id="password"
            name="password"
            class="form-input mt-1"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
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
