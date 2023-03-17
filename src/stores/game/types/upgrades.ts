import { UnitCost } from './unit';
import { defineUpgrade } from './upgrade';

export const GU_CLICK_KNOWLEDGES = defineUpgrade(
  'GU_CLICK_KNOWLEDGES',
  'Knowlenges from clicks',
  'Allow get knowlenges from clicks',
  [new UnitCost('energy', '10')],
  (game) => {
    game.player.units.knowledges.clickIsAllow = true;
  }
);
