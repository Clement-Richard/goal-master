export default defineNuxtConfig({
  css: ["~/assets/scss/style.scss"],
  modules: ['@pinia/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    API_BASE_URL:"http://skymunt.fr:3000/api/goalMaster/"
  }
});
