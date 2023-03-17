import { Unit, UnitCost, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { defineUpgradeType } from './upgrade';

export const GU_CLICKS_KNOWLEDGE = defineUpgradeType('GU_CLICKS_KNOWLEDGE', {
  name: 'Knowlenges clicks',
  description: 'Allow get knowledges from clicks',
  costs: [new UnitCost(U_ENERGY, '10')],
  onBuy: (game) => {
    (game.player.units.get(U_KNOWLENGE) as Unit).clickIsAllow = true;
    game.upgrades.addUpgrade(GU_OPEN_SKILLS);
    game.upgrades.addUpgrade(GU_RESOURCE_CLICKS);
  },
});

export const GU_OPEN_SKILLS = defineUpgradeType('GU_OPEN_SKILLS', {
  name: 'Skills',
  description: 'Open skills',
  costs: [new UnitCost(U_ENERGY, '20'), new UnitCost(U_KNOWLENGE, '10')],
});

export const GU_RESOURCE_CLICKS = defineUpgradeType('GU_RESOURCE_CLICKS', {
  name: 'Resources clicks',
  description: 'Allow get resources from clicks',
  costs: [new UnitCost(U_ENERGY, '100'), new UnitCost(U_KNOWLENGE, '50')],
  onBuy: (game) => {
    (game.player.units.get(U_RESOURCE) as Unit).clickIsAllow = true;
  },
});
