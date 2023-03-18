import {
  SK_CLICKS_BASE,
  SK_CLICKS_ENERGY,
  SK_CLICKS_KNOWLEDGE,
  SK_CLICKS_RESOURCE,
} from './skills';
import { UnitCost, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { defineUpgradeType } from './upgrade';

export const GU_CLICKS_KNOWLEDGE = defineUpgradeType({
  sysName: 'GU_CLICKS_KNOWLEDGE',
  name: 'Knowlenges clicks',
  description: 'Allow get knowledges from clicks',
  costs: [new UnitCost(U_ENERGY, '10')],
  onBuy: (game) => {
    game.units.enableClicksForUnit(U_KNOWLENGE);
    game.upgrades.addAvailableUpgrades([GU_OPEN_SKILLS, GU_RESOURCE_CLICKS]);
  },
});

export const GU_OPEN_SKILLS = defineUpgradeType({
  sysName: 'GU_OPEN_SKILLS',
  name: 'Skills',
  description: 'Open skills',
  costs: [new UnitCost(U_ENERGY, '20'), new UnitCost(U_KNOWLENGE, '10')],
  onBuy: (game) => {
    game.skillsCont.enableSkill(SK_CLICKS_BASE);
    game.upgrades.addAvailableUpgrades([
      GU_SKILL_ENERGY_CLICKS,
      GU_SKILL_KNOWLEDGE_CLICKS,
      GU_SKILL_RESOURCE_CLICKS,
    ]);
  },
});

export const GU_RESOURCE_CLICKS = defineUpgradeType({
  sysName: 'GU_RESOURCE_CLICKS',
  name: 'Resources clicks',
  description: 'Allow get resources from clicks',
  costs: [new UnitCost(U_ENERGY, '100'), new UnitCost(U_KNOWLENGE, '50')],
  onBuy: (game) => {
    game.units.enableClicksForUnit(U_RESOURCE);
  },
});

export const GU_SKILL_ENERGY_CLICKS = defineUpgradeType({
  sysName: 'GU_SKILL_ENERGY_CLICKS',
  name: 'Energy clicks skill',
  description: 'Open energy clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '150'),
    new UnitCost(U_KNOWLENGE, '75'),
    new UnitCost(U_RESOURCE, '25'),
  ],
  onBuy: (game) => {
    game.skillsCont.enableSkill(SK_CLICKS_ENERGY);
  },
});

export const GU_SKILL_KNOWLEDGE_CLICKS = defineUpgradeType({
  sysName: 'GU_SKILL_KNOWLEDGE_CLICKS',
  name: 'Knowlenge clicks skill',
  description: 'Open knowlenge clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '300'),
    new UnitCost(U_KNOWLENGE, '200'),
    new UnitCost(U_RESOURCE, '100'),
  ],
  onBuy: (game) => {
    game.skillsCont.enableSkill(SK_CLICKS_KNOWLEDGE);
  },
});

export const GU_SKILL_RESOURCE_CLICKS = defineUpgradeType({
  sysName: 'GU_SKILL_RESOURCE_CLICKS',
  name: 'Resource clicks skill',
  description: 'Open resource clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '500'),
    new UnitCost(U_KNOWLENGE, '350'),
    new UnitCost(U_RESOURCE, '200'),
  ],
  onBuy: (game) => {
    game.skillsCont.enableSkill(SK_CLICKS_RESOURCE);
  },
});
