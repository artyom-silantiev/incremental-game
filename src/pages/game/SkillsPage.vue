<script setup lang="ts">
import { useGameStore } from 'src/stores/game';

const gameStore = useGameStore();
const game = gameStore.game;
const skills = game.skills;
</script>

<template>
  <q-page class="skills-page">
    <div class="skills-tree q-mt-md q-pa-md q-gutter-sm">
      {{ skills }}
    </div>
  </q-page>
</template>

<style lang="scss">
.skills-page {
  margin: 0 auto;
  max-width: 900px;

  .skills-tree {
  }
}
</style>
