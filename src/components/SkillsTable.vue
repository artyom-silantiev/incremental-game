<script lang="ts">
export default {
  name: 'SkillsTable',
};
</script>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useGameStore } from 'src/stores/game';
import { Skill } from 'src/types/skill';
import { U_KNOWLENGE } from 'src/types/unit';

export interface Props {
  skills: Skill[];
  subTable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  subTable: false,
});

const gameStore = useGameStore();
const skillsCont = gameStore.game.skills;
const units = gameStore.game.units;

const columns = [
  { name: 'name', field: 'name', label: 'Name', align: 'left' },
  { name: 'level', field: 'level', label: 'Level', align: 'left' },
  { name: 'xp', field: 'xp', label: 'Xp', align: 'left' },
  { name: 'xpPlus', field: 'xpPlus', label: 'XpPlus', align: 'left' },
  { name: 'actions', field: 'actions', label: 'Actions', align: 'left' },
] as QTableColumn[];

function getSkillXpProgress(skill: Skill) {
  return skill.xp.div(skill.xpNeed).toNumber();
}
</script>

<template>
  <q-table
    :rows="skills"
    :columns="columns"
    row-key="index"
    :dense="props.subTable"
    hide-bottom
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th key="name" style="width: 20%; text-align: left"> Name </q-th>
        <q-th key="level" style="width: 10%; text-align: left"> Level </q-th>
        <q-th key="xp" style="width: 30%; text-align: left"> Xp </q-th>
        <q-th key="xpPlus" style="width: 10%; text-align: left"> +Xp </q-th>
        <q-th key="actions" style="width: 30%; text-align: left">
          Actions
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props" :key="props.row.type.sysName">
        <q-td key="name">
          {{ props.row?.type.name }} {{ props.row?.now }}
        </q-td>
        <q-td key="level">
          {{ props.row?.level }}
        </q-td>
        <q-td key="xp">
          <q-linear-progress
            rounded
            size="15px"
            :title="props.row?.xp + '/' + props.row?.xpNeed"
            :value="getSkillXpProgress(props.row)"
            color="secondary"
            class="q-mt-sm"
            instant-feedback
          />
        </q-td>
        <q-td key="xpPlus">
          {{ props.row?.xpPlus.mul(props.row.xpRate) }}
        </q-td>
        <q-td key="actions">
          <span v-if="skillsCont.allowSkillsXpUpgrades">
            <q-btn
              label="+1 Xp"
              :class="{
                disabled: units
                  .get(U_KNOWLENGE)
                  ?.value.lt(props.row.xpUpgradeCost),
              }"
              @click="skillsCont.skillXpUpgrade(props.row)"
            >
              <q-tooltip>
                Knowledge cost: {{ props.row.xpUpgradeCost }}<br />
              </q-tooltip>
            </q-btn>
          </span>
        </q-td>
      </q-tr>
      <q-tr
        :props="props"
        :key="`e_${props.row.index}`"
        class="q-virtual-scroll--with-prev"
      >
        <q-td colspan="100%">
          <q-list dense>
            <q-item>
              {{ props.row?.type.description }}
            </q-item>
            <q-expansion-item
              v-if="props.row?.subSkills.filter((x: Skill) => x.enabled).length"
              label="Sub skills"
              expand-separator
              dense
            >
              <SkillsTable
                :skills="props.row?.subSkills.filter((x: Skill) => x.enabled)"
                :subTable="true"
              />
            </q-expansion-item>
          </q-list>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
