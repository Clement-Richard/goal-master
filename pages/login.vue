<template>
  <div>
    <h2>Formulaire de Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Se connecter</button>
      </div>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(
          "http://skymunt.fr:3000/api/goalMaster/security/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );

        if (response.ok) {
          this.$router.push("/");
        } else {
          const data = await response.json();
          this.errorMessage = data.message || "Échec de la connexion.";
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        this.errorMessage = "Une erreur s'est produite lors de la connexion.";
      }
    },
  },
};
</script>
