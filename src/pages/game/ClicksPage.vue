<script setup lang="ts">
import { useGameStore } from 'src/stores/game';
import { U_ENERGY, U_KNOWLENGE, U_RESOURCE } from 'src/types/unit';

const gameStore = useGameStore();
const game = gameStore.game;
const upgrades = game.upgrades;
const units = game.units;
</script>

<template>
  <q-page class="clicks-page">
    <div class="units-buttons q-mt-md q-gutter-md">
      <div class="text-h6">Units:</div>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.unitIsAllowForClicks(U_ENERGY)"
        @click="game.onClickUnit(U_ENERGY)"
      >
        <q-tooltip>
          Effect: {{ units.get(U_ENERGY)?.getEffect() }}<br />
        </q-tooltip>
        Energy<br />
        {{ units.get(U_ENERGY)?.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.unitIsAllowForClicks(U_KNOWLENGE)"
        @click="game.onClickUnit(U_KNOWLENGE)"
      >
        <q-tooltip>
          Effect: {{ units.get(U_KNOWLENGE)?.getEffect() }}<br />
          Energy cost: {{ units.get(U_KNOWLENGE)?.getCost() }}<br />
        </q-tooltip>
        Knowledges<br />
        {{ units.get(U_KNOWLENGE)?.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.unitIsAllowForClicks(U_RESOURCE)"
        @click="game.onClickUnit(U_RESOURCE)"
      >
        <q-tooltip>
          Effect: {{ units.get(U_RESOURCE)?.getEffect() }}<br />
          Energy cost: {{ units.get(U_RESOURCE)?.getCost() }}<br />
        </q-tooltip>
        Resources<br />
        {{ units.get(U_RESOURCE)?.value.toString() }}
      </q-btn>
    </div>

    <div class="upgrades q-gutter-md q-mt-md">
      <div class="text-h6">Upgrades:</div>

      <q-btn
        v-for="upgrade in upgrades.availableUpgrades.values()"
        :key="upgrade.type.sysName + upgrade.availableToBuy"
        class="upgrade-btn"
        :class="{
          disabled: upgrade.availableToBuy === false,
        }"
        color="indigo"
        no-caps
        @click="game.onClickUpgrade(upgrade.type.sysName)"
      >
        <q-tooltip>
          {{ upgrade.type.description }}
        </q-tooltip>
        <span class="title"> {{ upgrade.type.name }} </span>
        <br />
        <span class="costs"
          >({{
            upgrade.type.costs
              .map((v) => `${v.unitType.name}: ${v.value}`)
              .join(', ')
          }})</span
        >
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss">
.clicks-page {
  margin: 0 auto;
  max-width: 900px;

  .units-buttons {
    .unit-button {
      display: block;
    }
  }

  .upgrades {
    .upgrade-btn {
      width: 100%;
      max-width: 280px;

      .title {
        display: contents;
        font-size: 18px;
      }
      .description {
        display: contents;
        font-size: 14px;
      }
      .costs {
        display: contents;
        font-size: 10px;
      }
    }
  }
}
</style>
