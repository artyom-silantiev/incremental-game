import { defineSkillType } from './skill';
import { U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';

export const SK_CLICKS_ENERGY = defineSkillType({
  sysName: 'SK_CLICKS_ENERGY',
  name: 'Energy clicks',
  description: 'Increase base click power by 2% from skill level',
  enabled: false,
  initHandler: (game, skill) => {
    game.eventBus.on(`onClickUnit_${U_ENERGY}`, () => {
      const onLevelUp = skill.xpGain();
      if (onLevelUp) game.update();
    });
  },
});

export const SK_CLICKS_KNOWLEDGE = defineSkillType({
  sysName: 'SK_CLICKS_KNOWLEDGE',
  name: 'Knowlenge clicks',
  description: 'Increase base click power by 2% from skill level',
  enabled: false,
  initHandler: (game, skill) => {
    game.eventBus.on(`onClickUnit_${U_KNOWLENGE}`, () => {
      const onLevelUp = skill.xpGain();
      if (onLevelUp) game.update();
    });
  },
});

export const SK_CLICKS_RESOURCE = defineSkillType({
  sysName: 'SK_CLICKS_RESOURCE',
  name: 'Resource clicks',
  description: 'Increase base click power by 2% from skill level',
  enabled: false,
  initHandler: (game, skill) => {
    game.eventBus.on(`onClickUnit_${U_RESOURCE}`, () => {
      const onLevelUp = skill.xpGain();
      if (onLevelUp) game.update();
    });
  },
});

export const SK_CLICKS_BASE = defineSkillType({
  sysName: 'SK_CLICKS_BASE',
  name: 'Base clicks',
  description: 'Increase base click power by 1 from skill level',
  enabled: false,
  subSkills: [SK_CLICKS_ENERGY, SK_CLICKS_KNOWLEDGE, SK_CLICKS_RESOURCE],
  initHandler: (game, skill) => {
    game.eventBus.on('onClickUnit', (unitType: string) => {
      const onLevelUp = skill.xpGain();
      if (onLevelUp) game.update();
    });
  },
});
