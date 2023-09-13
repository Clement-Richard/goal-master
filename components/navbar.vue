<template>
  <nav class="bg-white border-gray-200 dark:bg-zinc-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GoalMaster</span>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false"></button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-zinc-900 md:dark:bg-zinc-900 dark:border-zinc-700">
          <li>
            <nuxt-link to="/"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.home class="navbar-link-icon"></icons.home>
              </span>
              Accueil
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/matchs"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.bolt class="navbar-link-icon"></icons.bolt>
              </span>
              Matchs
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profil"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.user class="navbar-link-icon"></icons.user>
              </span>
              Profil
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.envelope class="navbar-link-icon"></icons.envelope>
              </span>
              Contact</nuxt-link>
          </li>
          <li v-if="authStore.isLoggedIn">
            <nuxt-link @click="logout" to="/"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.doorLeave class="navbar-link-icon"></icons.doorLeave>
              </span>
              Déconnexion
            </nuxt-link>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <nuxt-link to="/register"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.lockClosed class="navbar-link-icon"></icons.lockClosed>
              </span>
              Inscription</nuxt-link>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <nuxt-link to="/login"
              class="flex py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-emerald-500 md:p-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250"
              aria-current="page">
              <span class="mr-1">
                <icons.lockOpened class="navbar-link-icon"></icons.lockOpened>
              </span>
              Connexion</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

import { HomeIcon, UserIcon, BoltIcon, EnvelopeIcon, LockClosedIcon, LockOpenIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";

const icons = reactive({
  home: HomeIcon,
  user: UserIcon,
  bolt: BoltIcon,
  envelope: EnvelopeIcon,
  lockClosed: LockClosedIcon,
  lockOpened: LockOpenIcon,
  doorLeave: ArrowRightOnRectangleIcon
});

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>
