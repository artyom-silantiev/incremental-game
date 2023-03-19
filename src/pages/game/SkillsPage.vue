<script setup lang="ts">
import { useGameStore } from 'src/stores/game';
import SkillsTable from 'src/components/SkillsTable.vue';
import { Skill } from 'src/types/skill';
const gameStore = useGameStore();
const game = gameStore.game;
const skills = game.skills.mainSkills as Skill[];
</script>

<template>
  <q-page class="skills-page">
    <div class="skills-table q-mt-md q-pa-md q-gutter-sm">
      <SkillsTable :skills="skills" />
    </div>
  </q-page>
</template>

<style lang="scss">
.skills-page {
  margin: 0 auto;
  max-width: 1440px;

  .skills-table {
  }
}
</style>
