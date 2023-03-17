import { defineSkill, loadSkillsComplete } from './skill';
import { UnitCost } from './unit';

export const SK_CLICKS_BASE = defineSkill(
  'SK_CLICKS_BASE',
  'Knowlenges from clicks',
  'Allow get knowlenges from clicks',
  {
    allow: true,
  }
);

loadSkillsComplete();
