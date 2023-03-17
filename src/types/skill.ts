import Decimal from 'decimal.js';
import { Deferred } from 'src/lib/helpers';

const skillsTypes = {} as {
  [sysSkillTypeName: string]: SkillType;
};

export async function defineSkillType(
  sysSkillName: string,
  params: {
    name: string;
    description: string;
    subSkills?: string[];
    allow?: true;
  }
) {
  params = params || {};

  const skill = new SkillType(sysSkillName, params.name, params.description);

  if (params.subSkills) {
    await loadSkillsTypesPromise;
    skill.subSkillsTypes = params.subSkills.map((s) => getSkillType(s));
  }

  skillsTypes[sysSkillName] = skill;

  return sysSkillName;
}

export function getSkillType(sysSkillName: string) {
  if (!skillsTypes[sysSkillName]) {
    throw new Error('Skill type not found!');
  }
  return skillsTypes[sysSkillName];
}

const loadSkillsTypesPromise = new Deferred<boolean>();
export function loadSkillsTypesComplete() {
  loadSkillsTypesPromise.resolve(true);
}

export function createSkillFromType(skillTypeName: string) {
  const skillType = getSkillType(skillTypeName);
  const skill = new Skill(skillType);

  if (skillType.subSkillsTypes.length) {
    for (const subSkillType of skillType.subSkillsTypes) {
      const subSkill = createSkillFromType(subSkillType.sysName);
      skill.subSkills.push(subSkill);
    }
  }

  return skill;
}

export class SkillType {
  subSkillsTypes = [] as SkillType[];

  constructor(
    public sysName: string,
    public name: string,
    public description: string
  ) {}
}

export class Skill {
  subSkills = [] as Skill[];
  isAllow = false;

  level = new Decimal('0');
  xp = new Decimal('0');
  needXp = new Decimal('10');

  constructor(public type: SkillType) {}
}
