import { defineStore } from 'pinia'

export const useAuthStore: any = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const user = ref(null);

  function login(credentials: any) {
    isLoggedIn.value = true;
    console.log(credentials);
  }

  function logout() {
    isLoggedIn.value = false;
  }

  return { isLoggedIn, user, login, logout }
})
