<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Clicks',
    caption: 'for make units',
    icon: 'school',
    link: '/game',
  },
  {
    title: 'Exit',
    caption: 'game out',
    icon: 'school',
    link: '/',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Incremental Game v0.1 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Game Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
