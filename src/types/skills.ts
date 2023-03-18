import { defineSkillType } from './skill';
import { UnitCost } from './unit';

export const SK_CLICKS_BASE2 = defineSkillType({
  sysName: 'SK_CLICKS_BASE2',
  name: 'Test skill',
  description: 'Ever skill level take +1 to base click power',
  enabled: false,
});

export const SK_CLICKS_BASE = defineSkillType({
  sysName: 'SK_CLICKS_BASE',
  name: 'Base clicks skill',
  description: 'Ever skill level take +1 to base click power',
  enabled: false,
  subSkills: [SK_CLICKS_BASE2],
});
