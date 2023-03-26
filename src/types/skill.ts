import Decimal from 'decimal.js';
import { Game } from './game';

const skillsTypes = {} as {
  [sysSkillTypeName: string]: SkillType;
};

export function getSkillType(sysSkillName: string) {
  if (!skillsTypes[sysSkillName]) {
    throw new Error('Skill type not found!');
  }
  return skillsTypes[sysSkillName];
}

export function createSkillFromType(skillTypeName: string) {
  const skillType = getSkillType(skillTypeName);
  const skill = new Skill(skillType);

  if (skillType.subSkills.length) {
    for (const subSkillType of skillType.subSkills) {
      const subSkill = createSkillFromType(subSkillType);
      subSkill.deep = skill.deep + 1;
      skill.subSkills.push(subSkill);
    }
  }

  if (skillType.enabled) {
    skill.enabled = skillType.enabled;
  }

  return skill;
}

type SkillUpdateHandler = (game: Game, skill: Skill) => void;
type SkillUnitClickHandler = (
  game: Game,
  skill: Skill,
  unitType: string
) => void;

type SkillTypeParams = {
  sysName: string;
  name: string;
  description: string;
  enabled: boolean;
  subSkills?: string[] | undefined;
  onUpdate?: SkillUpdateHandler;
  onUnitClick?: SkillUnitClickHandler;
};
export function defineSkillType(params: SkillTypeParams) {
  return new SkillType(params).sysName;
}
export class SkillType {
  sysName: string;
  name: string;
  description: string;
  enabled = false;
  subSkills = [] as string[];
  onUpdate = null as null | SkillUpdateHandler;
  onUnitClick = null as null | SkillUnitClickHandler;

  constructor(params: SkillTypeParams) {
    this.sysName = params.sysName;
    this.name = params.name;
    this.description = params.description;
    this.enabled = params.enabled;

    if (params.subSkills) {
      this.subSkills = params.subSkills;
    }

    if (params.onUpdate) {
      this.onUpdate = params.onUpdate;
    }

    if (params.onUnitClick) {
      this.onUnitClick = params.onUnitClick;
    }

    skillsTypes[this.sysName] = this;
  }
}

export class Skill {
  subSkills = [] as Skill[];
  enabled = false;

  deep = 0;
  level = new Decimal('1');
  xp = new Decimal('0');
  xpPlus = new Decimal('1');
  xpRate = new Decimal('1.0');
  xpNeed = new Decimal('10');
  xpUpgradeCost = new Decimal('1000');

  constructor(public type: SkillType) {}

  update(game: Game) {
    if (this.type.onUpdate) {
      this.type.onUpdate(game, this);
    }
  }

  xpGain() {
    if (!this.enabled) {
      return false;
    }

    const addXp = this.xpPlus.mul(this.xpRate);

    this.xp = this.xp.plus(addXp);

    if (this.xp.gte(this.xpNeed)) {
      this.levelUps();
      return true;
    }

    return false;
  }

  private levelUps() {
    while (this.xp.gte(this.xpNeed)) {
      this.xp = this.xp.minus(this.xpNeed);
      this.level = this.level.plus(1);
      this.updateXpNeed();
    }
  }

  private updateXpNeed() {
    this.xpNeed = new Decimal(this.level).pow('1.15').mul('10').ceil();
  }
}
