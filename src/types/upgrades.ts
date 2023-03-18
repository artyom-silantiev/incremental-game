import { Skill } from './skill';
import { SK_CLICKS_BASE } from './skills';
import { Unit, UnitCost, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { defineUpgradeType } from './upgrade';

export const GU_CLICKS_KNOWLEDGE = defineUpgradeType({
  sysName: 'GU_CLICKS_KNOWLEDGE',
  name: 'Knowlenges clicks',
  description: 'Allow get knowledges from clicks',
  costs: [new UnitCost(U_ENERGY, '10')],
  onBuy: (game) => {
    (game.units.get(U_KNOWLENGE) as Unit).clickIsAllow = true;
    game.upgrades.addAvailableUpgrade(GU_OPEN_SKILLS);
    game.upgrades.addAvailableUpgrade(GU_RESOURCE_CLICKS);
  },
});

export const GU_OPEN_SKILLS = defineUpgradeType({
  sysName: 'GU_OPEN_SKILLS',
  name: 'Skills',
  description: 'Open skills',
  costs: [new UnitCost(U_ENERGY, '20'), new UnitCost(U_KNOWLENGE, '10')],
});

export const GU_RESOURCE_CLICKS = defineUpgradeType({
  sysName: 'GU_RESOURCE_CLICKS',
  name: 'Resources clicks',
  description: 'Allow get resources from clicks',
  costs: [new UnitCost(U_ENERGY, '100'), new UnitCost(U_KNOWLENGE, '50')],
  onBuy: (game) => {
    (game.units.get(U_RESOURCE) as Unit).clickIsAllow = true;
    (game.skills.get(SK_CLICKS_BASE) as Skill).enabled = true;
  },
});
