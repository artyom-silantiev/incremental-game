<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from 'src/stores/game';
import { GU_OPEN_SKILLS } from 'src/types/upgrades';

const gameStore = useGameStore();
const game = gameStore.game;
const gameUpgrades = game.upgrades;

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

        <!-- ITEM Clicks -->
        <q-item clickable tag="a" to="/game/clicks">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Clicks</q-item-label>
            <q-item-label caption>For make units</q-item-label>
          </q-item-section>
        </q-item>

        <!-- ITEM Skills -->
        <q-item
          clickable
          tag="a"
          to="/game/skills"
          :disable="!gameUpgrades.hasUpgrade(GU_OPEN_SKILLS)"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Skills</q-item-label>
            <q-item-label caption>Your skills</q-item-label>
          </q-item-section>
        </q-item>

        <!-- ITEM Exit -->
        <q-item clickable tag="a" to="/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Exit</q-item-label>
            <q-item-label caption>Exit to main menu</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
