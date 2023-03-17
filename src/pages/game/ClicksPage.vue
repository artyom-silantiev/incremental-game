<script setup lang="ts">
import { useGameStore } from 'src/stores/game';
import { U_ENERGY, U_KNOWLENGES, U_RESOURCES } from 'src/types/unit';

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
        :disable="!playerUnits.unitIsAllowForClicks(U_KNOWLENGES)"
        @click="playerUnits.onUnitClick(U_KNOWLENGES)"
      >
        <q-tooltip>
          Effect: {{ playerUnits.get(U_KNOWLENGES)?.getEffect() }}<br />
          Energy cost: {{ playerUnits.get(U_KNOWLENGES)?.getCost() }}<br />
        </q-tooltip>
        Knowledges<br />
        {{ playerUnits.get(U_KNOWLENGES)?.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.unitIsAllowForClicks(U_RESOURCES)"
        @click="playerUnits.onUnitClick(U_RESOURCES)"
      >
        <q-tooltip>
          Effect: {{ playerUnits.get(U_RESOURCES)?.getEffect() }}<br />
          Energy cost: {{ playerUnits.get(U_RESOURCES)?.getCost() }}<br />
        </q-tooltip>
        Resources<br />
        {{ playerUnits.get(U_RESOURCES)?.value.toString() }}
      </q-btn>
    </div>

    <div class="upgrades q-mt-md">
      <div class="text-h6">Upgrades:</div>

      <q-btn
        v-for="upgrade in gameUpgrades.availableUpgrades.values()"
        :key="upgrade.sysName"
        color="indigo"
        no-caps
        :disable="gameUpgrades.upgradeIsAvailable(upgrade) === false"
        @click="gameUpgrades.tryBuyUpgrade(upgrade.sysName)"
      >
        <span class="upgrade-title"> {{ upgrade.name }} </span>
        <br />
        <span class="upgrade-description">{{ upgrade.description }}</span>
        <br />
        <span class="upgrade-costs"
          >({{
            upgrade.costs
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
  max-width: 400px;

  .units-buttons {
    .unit-button {
      display: block;
    }
  }

  .upgrades {
    .upgrade-title {
      display: contents;
      font-size: 20px;
    }
    .upgrade-description {
      display: contents;
      font-size: 14px;
    }
    .upgrade-costs {
      display: contents;
      font-size: 10px;
    }
  }
}
</style>
