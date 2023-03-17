<script setup lang="ts">
import { useGameStore } from 'src/stores/game';

const gameStore = useGameStore();
const game = gameStore.game;
</script>

<template>
  <q-page class="skills-page">
    <div class="q-mt-md">Skills page</div>
  </q-page>
</template>

<style lang="scss">
.skills-page {
  margin: 0 auto;
  max-width: 400px;
}
</style>
