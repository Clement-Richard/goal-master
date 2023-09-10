import { defineStore } from "pinia";

export const useAuthStore: any = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const user = ref(null);

  async function login(credentials: any) {
    try {
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
        isLoggedIn.value = true;
        response.json().then((data) => {
          user.value = data.res;
        });
      } else {
        console.error("La requête a échoué avec le statut :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST :", error);
    }
  }

  function logout() {
    isLoggedIn.value = false;
  }

  return { isLoggedIn, user, login, logout };
});
