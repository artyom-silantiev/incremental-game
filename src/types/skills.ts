import { defineSkillType, loadSkillsTypesComplete } from './skill';
import { UnitCost } from './unit';

export const SK_CLICKS_BASE = defineSkillType('SK_CLICKS_BASE', {
  name: 'Base clicks skill',
  description: 'Ever skill level take +1 to base click power',
  allow: true,
});

loadSkillsTypesComplete();
