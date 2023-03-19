import { SkillType } from './skill';
import { U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';

export const SK_CLICKS_ENERGY = new SkillType({
  sysName: 'SK_CLICKS_ENERGY',
  name: 'Energy clicks',
  description: 'Increase energy click power by 2% per skill level',
  enabled: false,
  onUnitClick: (game, skill, unitType: string) => {
    if (unitType === U_ENERGY) {
      game.skills.xpGain(skill.type.sysName);
    }
  },
}).sysName;

export const SK_CLICKS_KNOWLEDGE = new SkillType({
  sysName: 'SK_CLICKS_KNOWLEDGE',
  name: 'Knowlenge clicks',
  description: 'Increase knowledge click power by 2% per skill level',
  enabled: false,
  onUnitClick: (game, skill, unitType: string) => {
    if (unitType === U_KNOWLENGE) {
      game.skills.xpGain(skill.type.sysName);
    }
  },
}).sysName;

export const SK_CLICKS_RESOURCE = new SkillType({
  sysName: 'SK_CLICKS_RESOURCE',
  name: 'Resource clicks',
  description: 'Increase resource click power by 2% per skill level',
  enabled: false,
  onUnitClick: (game, skill, unitType: string) => {
    if (unitType === U_RESOURCE) {
      game.skills.xpGain(skill.type.sysName);
    }
  },
}).sysName;

export const SK_CLICKS_BASE = new SkillType({
  sysName: 'SK_CLICKS_BASE',
  name: 'Base clicks',
  description: 'Increase base click power by 1 per skill level',
  enabled: false,
  subSkills: [SK_CLICKS_ENERGY, SK_CLICKS_KNOWLEDGE, SK_CLICKS_RESOURCE],
  onUnitClick: (game, skill) => {
    game.skills.xpGain(skill.type.sysName);
  },
}).sysName;
