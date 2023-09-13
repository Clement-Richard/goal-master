import { Navbar } from '../.nuxt/components';
<template>
  <div>
    <Sidebar class="z-50" :sidebarIsOpened="sidebarIsOpened" @toggle-sidebar="toggleSidebar"/>
    <div class="transition duration-300" id="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  const sidebarIsOpened = ref(false)

  const toggleSidebar = () => {
    sidebarIsOpened.value = !sidebarIsOpened.value ;
  };
</script>