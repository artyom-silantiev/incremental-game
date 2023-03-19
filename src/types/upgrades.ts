import {
  SK_CLICKS_BASE,
  SK_CLICKS_ENERGY,
  SK_CLICKS_KNOWLEDGE,
  SK_CLICKS_RESOURCE,
} from './skills';
import { UnitCost, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { UpgradeType } from './upgrade';

export const GU_CLICKS_KNOWLEDGE = new UpgradeType({
  sysName: 'GU_CLICKS_KNOWLEDGE',
  name: 'Knowlenges clicks',
  description: 'Allow get knowledges from clicks',
  costs: [new UnitCost(U_ENERGY, '10')],
  onBuy: (game) => {
    game.units.enableClicksForUnit(U_KNOWLENGE);
    game.upgrades.addAvailableUpgrades([GU_OPEN_SKILLS, GU_RESOURCE_CLICKS]);
  },
}).sysName;

export const GU_OPEN_SKILLS = new UpgradeType({
  sysName: 'GU_OPEN_SKILLS',
  name: 'Skills',
  description: 'Open skills',
  costs: [new UnitCost(U_ENERGY, '20'), new UnitCost(U_KNOWLENGE, '10')],
  onBuy: (game) => {
    game.skills.enableSkill(SK_CLICKS_BASE);
    game.upgrades.addAvailableUpgrades([
      GU_SKILL_ENERGY_CLICKS,
      GU_SKILL_KNOWLEDGE_CLICKS,
      GU_SKILL_RESOURCE_CLICKS,
    ]);
  },
}).sysName;

export const GU_RESOURCE_CLICKS = new UpgradeType({
  sysName: 'GU_RESOURCE_CLICKS',
  name: 'Resources clicks',
  description: 'Allow get resources from clicks',
  costs: [new UnitCost(U_ENERGY, '100'), new UnitCost(U_KNOWLENGE, '50')],
  onBuy: (game) => {
    game.units.enableClicksForUnit(U_RESOURCE);
  },
}).sysName;

export const GU_SKILL_ENERGY_CLICKS = new UpgradeType({
  sysName: 'GU_SKILL_ENERGY_CLICKS',
  name: 'Energy clicks skill',
  description: 'Open energy clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '150'),
    new UnitCost(U_KNOWLENGE, '75'),
    new UnitCost(U_RESOURCE, '25'),
  ],
  onBuy: (game) => {
    game.skills.enableSkill(SK_CLICKS_ENERGY);
  },
}).sysName;

export const GU_SKILL_KNOWLEDGE_CLICKS = new UpgradeType({
  sysName: 'GU_SKILL_KNOWLEDGE_CLICKS',
  name: 'Knowlenge clicks skill',
  description: 'Open knowlenge clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '300'),
    new UnitCost(U_KNOWLENGE, '200'),
    new UnitCost(U_RESOURCE, '100'),
  ],
  onBuy: (game) => {
    game.skills.enableSkill(SK_CLICKS_KNOWLEDGE);
  },
}).sysName;

export const GU_SKILL_RESOURCE_CLICKS = new UpgradeType({
  sysName: 'GU_SKILL_RESOURCE_CLICKS',
  name: 'Resource clicks skill',
  description: 'Open resource clicks skill',
  costs: [
    new UnitCost(U_ENERGY, '500'),
    new UnitCost(U_KNOWLENGE, '350'),
    new UnitCost(U_RESOURCE, '200'),
  ],
  onBuy: (game) => {
    game.skills.enableSkill(SK_CLICKS_RESOURCE);
  },
}).sysName;
