<script setup lang="ts">
import { useGameStore } from 'src/stores/game';

const gameStore = useGameStore();
const game = gameStore.game;
const skills = game.skillsCont.mainSkills;
</script>

<template>
  <q-page class="skills-page">
    <div class="skills-tree q-mt-md q-pa-md q-gutter-sm">
      <div v-for="skill in skills" :key="skill.type.sysName">
        {{ skill.type.name }} Lv:{{ skill.level }} Xp:{{ skill.xp }}/{{
          skill.xpNeed
        }}
        <div v-for="subSkill in skill.subSkills" :key="subSkill.type.sysName">
          {{ subSkill.type.name }} Lv:{{ subSkill.level }} Xp:{{
            subSkill.xp
          }}/{{ subSkill.xpNeed }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.skills-page {
  margin: 0 auto;
  max-width: 900px;

  .skills {
  }
}
</style>
