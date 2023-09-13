<template>
  <aside
    class="bg-zinc-900 text-white w-64 flex-shrink-0 h-screen fixed top-0 left-0 transform translate-x-0 transition-transform duration-300 ease-in-out flex flex-col"
    :class="isOpen ? 'translate-x-0' : '-translate-x-48'"
  >
    <div class="p-4 ml-1 text-2xl font-semibold flex flex-row">
      <img
        src="~/assets/images/goalmaster-logo.png"
        class="w-12 h-12 mr-2 ml-1"
        :class="isOpen ? 'translate-x-0 w-full' : 'translate-x-44'"
      />
      <span class="mt-2" :class="isOpen ? '' : 'hidden'">Goal Master</span>
    </div>
    <ul class="justify-center font-medium p-4 mt-4 space-y-4">
      <li>
        <nuxt-link
          to="/"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"
            ><icons.home class="navbar-link-icon"></icons.home
          ></span>
          <span :class="isOpen ? '' : 'hidden'">Accueil</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/matchs"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"
            ><icons.bolt class="navbar-link-icon"></icons.bolt
          ></span>
          <span :class="isOpen ? '' : 'hidden'">Matchs</span>
        </nuxt-link>
      </li>
      <li v-if="authStore.isLoggedIn">
        <nuxt-link
          to="/profil"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"><icons.user class="navbar-link-icon" /></span>
          <span :class="isOpen ? '' : 'hidden'">Profil</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/contact"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"><icons.envelope class="navbar-link-icon" /></span>
          <span :class="isOpen ? '' : 'hidden'">Contact</span>
        </nuxt-link>
      </li>
      <li v-if="authStore.isLoggedIn">
        <nuxt-link
          @click="logout"
          to="/"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"><icons.doorLeave class="navbar-link-icon" /></span>
          <span :class="isOpen ? '' : 'hidden'">Déconnexion</span>
        </nuxt-link>
      </li>
      <li v-if="!authStore.isLoggedIn">
        <nuxt-link
          to="/register"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"
            ><icons.lockClosed class="navbar-link-icon"
          /></span>
          <span :class="isOpen ? '' : 'hidden'">Inscription</span>
        </nuxt-link>
      </li>
      <li v-if="!authStore.isLoggedIn">
        <nuxt-link
          to="/register"
          class="flex items-center py-2 ml-1 mr-1 px-4 w-full text-white bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-300 duration-300 hover:-translate-y-1 hover:scale-100"
          :class="isOpen ? 'translate-x-0 w-full' : 'w-14 translate-x-44'"
        >
          <span class="mr-2"
            ><icons.lockOpened class="navbar-link-icon"
          /></span>
          <span :class="isOpen ? '' : 'hidden'">Connexion</span>
        </nuxt-link>
      </li>
    </ul>
    <button
      class="absolute bottom-0 right-0 p-4 bg-zinc-900 text-white"
      @click="toggleSidebar"
    >
      <icons.arrowCircleLeft
        class="w-8 h-8 hover:scale-125"
        :class="
          isOpen
            ? 'transition-transform duration-300'
            : 'transition-transform rotate-180 duration-300'
        "
      ></icons.arrowCircleLeft>
    </button>
  </aside>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

import {
  HomeIcon,
  UserIcon,
  BoltIcon,
  EnvelopeIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/vue/24/solid";

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const icons = reactive({
  home: HomeIcon,
  user: UserIcon,
  bolt: BoltIcon,
  envelope: EnvelopeIcon,
  lockClosed: LockClosedIcon,
  lockOpened: LockOpenIcon,
  doorLeave: ArrowRightOnRectangleIcon,
  arrowCircleLeft: ArrowLeftCircleIcon,
});

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>
