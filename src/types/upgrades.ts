import { UnitCost } from './unit';
import { defineUpgrade } from './upgrade';

export const GU_CLICK_KNOWLEDGES = defineUpgrade(
  'GU_CLICK_KNOWLEDGES',
  'Knowlenges from clicks',
  'Allow get knowlenges from clicks',
  [new UnitCost('energy', '10')],
  (game) => {
    game.player.units.knowledges.clickIsAllow = true;
    game.upgrades.addUpgrade(GU_OPEN_SKILLS);
  }
);

export const GU_OPEN_SKILLS = defineUpgrade(
  'GU_OPEN_SKILLS',
  'Skills',
  'Open skills feature',
  [new UnitCost('energy', '20'), new UnitCost('knowledges', '10')],
  (game) => {
    // noting
  }
);
