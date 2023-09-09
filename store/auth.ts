// store/auth.ts
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module
export default class AuthStore extends VuexModule {
  private token: string | null = null;

  // Getter pour vérifier si l'utilisateur est authentifié
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  // Mutation pour définir le token dans le store
  @Mutation
  private setToken(token: string | null) {
    this.token = token;
  }

  // Action pour effectuer la connexion
  @Action
  async login(credentials: { email: string; password: string }) {
    try {
      // Effectuez votre requête d'authentification ici
      const response = await fetch(
        "http://skymunt.fr:3000/api/goalMaster/security/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.context.commit("setToken", data.token); // Utilisez commit pour déclencher la mutation
      } else {
        // Gérez les erreurs d'authentification ici
      }
    } catch (error) {
      // Gérez les erreurs de connexion réseau ici
    }
  }

  // Action pour déconnecter l'utilisateur
  @Action
  logout() {
    // Déconnectez l'utilisateur en appelant la mutation avec un token null
    this.context.commit("setToken", null);
  }
}
