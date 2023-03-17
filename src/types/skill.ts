import Decimal from 'decimal.js';
import { Deferred } from 'src/lib/helpers';
import { GameDb } from './db';

export async function defineSkill(
  sysSkillName: string,
  name: string,
  description: string,
  params?: {
    subSkills?: string[];
    allow?: true;
  }
) {
  params = params || {};

  const skill = new Skill(sysSkillName, name, description);

  if (params.subSkills) {
    await loadSkillsDbPromise;
    skill.subSkills = params.subSkills.map((s) => getSkill(s));
  }

  if (params.allow) {
    skill.isAllow = true;
  }

  GameDb.Skills[sysSkillName] = skill;

  return sysSkillName;
}

export function getSkill(sysSkillName: string) {
  if (!GameDb.Skills[sysSkillName]) {
    throw new Error('Skill not found!');
  }
  return GameDb.Skills[sysSkillName];
}

const loadSkillsDbPromise = new Deferred<boolean>();
export function loadSkillsComplete() {
  loadSkillsDbPromise.resolve(true);
}

export class Skill {
  subSkills = [] as Skill[];
  isAllow = false;

  level = new Decimal('0');
  xp = new Decimal('0');
  needXp = new Decimal('10');

  constructor(
    public sysName: string,
    public name: string,
    public description: string
  ) {}
}
