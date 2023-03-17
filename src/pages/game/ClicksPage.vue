<script setup lang="ts">
import { useGameStore } from 'src/stores/game/game';

const gameStore = useGameStore();
const game = gameStore.game;
const gameUpgrades = game.upgrades;
const player = game.player;
const units = player.units;
</script>

<template>
  <q-page class="clicks-page">
    <div class="units-buttons q-mt-md q-gutter-md">
      <div class="text-h6">Units buttons:</div>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.energy.clickIsAllow"
        @click="player.onUnitClick('energy')"
      >
        <q-tooltip> Effect: {{ units.energy.getEffect() }}<br /> </q-tooltip>
        Energy<br />
        {{ units.energy.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.knowledges.clickIsAllow"
        @click="player.onUnitClick('knowledges')"
      >
        <q-tooltip>
          Effect: {{ units.knowledges.getEffect() }}<br />
          Energy cost: {{ units.knowledges.getCost() }}<br />
        </q-tooltip>
        Knowledges<br />
        {{ units.knowledges.value.toString() }}
      </q-btn>

      <q-btn
        color="indigo"
        no-caps
        :disable="!units.resources.clickIsAllow"
        @click="player.onUnitClick('resources')"
      >
        Resources<br />
        {{ units.resources.value.toString() }}
      </q-btn>
    </div>

    <div class="upgrades q-mt-md">
      <div class="text-h6">Upgrades:</div>

      <q-btn
        v-for="upgrade in gameUpgrades.availableUpgrades"
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
