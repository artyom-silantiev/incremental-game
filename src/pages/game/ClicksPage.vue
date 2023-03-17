<script setup lang="ts">
import { useGameStore } from 'src/stores/game';

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
        :disable="!playerUnits.energy.clickIsAllow"
        @click="playerUnits.onUnitClick('energy')"
      >
        <q-tooltip>
          Effect: {{ playerUnits.energy.getEffect() }}<br />
        </q-tooltip>
        Energy<br />
        {{ playerUnits.energy.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.knowledges.clickIsAllow"
        @click="playerUnits.onUnitClick('knowledges')"
      >
        <q-tooltip>
          Effect: {{ playerUnits.knowledges.getEffect() }}<br />
          Energy cost: {{ playerUnits.knowledges.getCost() }}<br />
        </q-tooltip>
        Knowledges<br />
        {{ playerUnits.knowledges.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!playerUnits.resources.clickIsAllow"
        @click="playerUnits.onUnitClick('resources')"
      >
        Resources<br />
        {{ playerUnits.resources.value.toString() }}
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
            upgrade.costs.map((v) => `${v.type}: ${v.value}`).join(', ')
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
