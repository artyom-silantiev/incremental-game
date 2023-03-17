import { Unit, UnitCost, U_ENERGY, U_KNOWLENGES } from './unit';
import { defineUpgradeType } from './upgrade';

export const GU_CLICK_KNOWLEDGES = defineUpgradeType(
  'GU_CLICK_KNOWLEDGES',
  'Knowlenges from clicks',
  'Allow get knowlenges from clicks',
  [new UnitCost(U_ENERGY, '10')],
  (game) => {
    (game.player.units.get(U_KNOWLENGES) as Unit).clickIsAllow = true;
    game.upgrades.addUpgrade(GU_OPEN_SKILLS);
  }
);

export const GU_OPEN_SKILLS = defineUpgradeType(
  'GU_OPEN_SKILLS',
  'Skills',
  'Open skills feature',
  [new UnitCost(U_ENERGY, '20'), new UnitCost(U_KNOWLENGES, '10')]
);
