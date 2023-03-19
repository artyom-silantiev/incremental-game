<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameStore } from 'src/stores/game';
import { Skill } from 'src/types/skill';

const gameStore = useGameStore();
const game = gameStore.game;
const skills = game.skillsCont.mainSkills;

const columns = [
  { name: 'name', field: 'name', label: 'Name', align: 'left' },
  { name: 'level', field: 'level', label: 'Level', align: 'left' },
  { name: 'xp', field: 'xp', label: 'Xp', align: 'left' },
  { name: 'xpPlus', field: 'xpPlus', label: 'XpPlus', align: 'left' },
  { name: 'actions', field: 'actions', label: 'Actions', align: 'left' },
];

const skill = ref<Skill>();
const rows = computed(() => {
  const rows = [] as Skill[];

  skills.forEach((skill) => {
    if (!skill.enabled) {
      return;
    }

    rows.push(skill as Skill);
  });

  return rows;
});
</script>

<template>
  <q-page class="skills-page">
    <div class="skills-table q-mt-md q-pa-md q-gutter-sm">
      {{ rows.length }}
      <q-table
        title="Skills"
        :rows="rows"
        :columns="columns"
        row-key="index"
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" :key="`m_${props.row.index}`">
            <q-td key="name" :props="props">
              {{ props.row?.type.name }}
            </q-td>
            <q-td key="level" :props="props">
              {{ props.row?.level }}
            </q-td>
            <q-td key="xp" :props="props">
              {{ props.row?.xp }}/{{ props.row?.xpNeed }}
            </q-td>
            <q-td key="xpPlus" :props="props">
              {{ props.row?.xpPlus.mul(props.row.xpRate) }}
            </q-td>
            <q-td key="actions" :props="props"> ... </q-td>
          </q-tr>
          <q-tr
            :props="props"
            :key="`e_${props.row.index}`"
            class="q-virtual-scroll--with-prev"
            :set="(skill = props.row)"
          >
            <q-td colspan="100%">
              <q-list dense>
                <q-item>
                  {{ props.row?.type.description }}
                </q-item>
                <q-expansion-item
                  v-if="props.row?.subSkills.length"
                  label="Sub skills"
                  expand-separator
                  dense
                >
                  <q-table
                    :rows="props.row.subSkills"
                    :columns="columns"
                    row-key="index"
                    dense
                    hide-bottom
                  >
                    <template v-slot:header="props">
                      <q-tr :props="props">
                        <q-th
                          v-for="col in props.cols"
                          :key="col.name"
                          :props="props"
                        >
                          {{ col.label }}
                        </q-th>
                      </q-tr>
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props" :key="`m_${props.row.index}`">
                        <q-td key="name" :props="props">
                          {{ props.row?.type.name }}
                        </q-td>
                        <q-td key="level" :props="props">
                          {{ props.row?.level }}
                        </q-td>
                        <q-td key="xp" :props="props">
                          {{ props.row?.xp }}/{{ skill?.xpNeed }}
                        </q-td>
                        <q-td key="xpPlus" :props="props">
                          {{ props.row?.xpPlus.mul(props.row.xpRate) }}
                        </q-td>
                        <q-td key="actions" :props="props"> ... </q-td>
                      </q-tr>
                      <q-tr
                        :props="props"
                        :key="`e_${props.row.index}`"
                        class="q-virtual-scroll--with-prev"
                      >
                        <q-td colspan="100%">
                          <q-list dense>
                            <q-item>{{ props.row?.type.description }}</q-item>
                          </q-list>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-expansion-item>
              </q-list>
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
