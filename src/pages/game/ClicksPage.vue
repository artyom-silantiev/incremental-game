<script setup lang="ts">
import { useGameStore } from 'src/stores/game';
import { U_ENERGY, U_KNOWLENGE, U_RESOURCE } from 'src/types/unit';

const gameStore = useGameStore();
const game = gameStore.game;
const gameUpgrades = game.upgrades;
const player = game.player;
const playerUnits = player.units;
</script>

<template>
  <q-page class="clicks-page">
    <div class="units-buttons q-mt-md q-gutter-md">
      <div class="text-h6">Units:</div>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.unitIsAllowForClicks(U_ENERGY)"
        @click="playerUnits.onUnitClick(U_ENERGY)"
      >
        <q-tooltip>
          Effect: {{ playerUnits.get(U_ENERGY)?.getEffect() }}<br />
        </q-tooltip>
        Energy<br />
        {{ playerUnits.get(U_ENERGY)?.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.unitIsAllowForClicks(U_KNOWLENGE)"
        @click="playerUnits.onUnitClick(U_KNOWLENGE)"
      >
        <q-tooltip>
          Effect: {{ playerUnits.get(U_KNOWLENGE)?.getEffect() }}<br />
          Energy cost: {{ playerUnits.get(U_KNOWLENGE)?.getCost() }}<br />
        </q-tooltip>
        Knowledges<br />
        {{ playerUnits.get(U_KNOWLENGE)?.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.unitIsAllowForClicks(U_RESOURCE)"
        @click="playerUnits.onUnitClick(U_RESOURCE)"
      >
        <q-tooltip>
          Effect: {{ playerUnits.get(U_RESOURCE)?.getEffect() }}<br />
          Energy cost: {{ playerUnits.get(U_RESOURCE)?.getCost() }}<br />
        </q-tooltip>
        Resources<br />
        {{ playerUnits.get(U_RESOURCE)?.value.toString() }}
      </q-btn>
    </div>

    <div class="upgrades q-gutter-md q-mt-md">
      <div class="text-h6">Upgrades:</div>

      <q-btn
        v-for="upgrade in gameUpgrades.availableUpgrades.values()"
        :key="upgrade.type.sysName"
        class="upgrade-btn"
        :class="{
          disabled: gameUpgrades.upgradeIsAvailable(upgrade) === false,
        }"
        color="indigo"
        no-caps
        @click="gameUpgrades.tryBuyUpgrade(upgrade.type.sysName)"
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
