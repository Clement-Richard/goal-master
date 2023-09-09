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
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        // La connexion a réussi, vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire.
        this.$router.push("/"); // Par exemple, rediriger vers la page d'accueil
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        this.errorMessage = "Échec de la connexion.";
      }
    },
  },
};
</script>
