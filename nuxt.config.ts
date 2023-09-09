export default defineNuxtConfig({
  css: ["~/assets/scss/style.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
