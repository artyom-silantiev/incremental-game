import Decimal from 'decimal.js';
import { Game } from './game';

type SkillUpdateHandler = (game: Game, skill: Skill) => void;
type SkillInitHandler = (game: Game, skill: Skill) => void;

const skillsTypes = {} as {
  [sysSkillTypeName: string]: SkillType;
};

type SkillTypeParams = {
  sysName: string;
  name: string;
  description: string;
  enabled: boolean;
  subSkills?: string[] | undefined;
  initHandler?: SkillInitHandler;
  updateHandler?: SkillUpdateHandler;
};

export function defineSkillType(params: SkillTypeParams) {
  const skill = new SkillType(params);

  if (params.subSkills) {
    skill.subSkills = params.subSkills;
  }

  skillsTypes[params.sysName] = skill;

  return params.sysName;
}

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
      skill.subSkills.push(subSkill);
    }
  }

  if (skillType.enabled) {
    skill.enabled = skillType.enabled;
  }

  return skill;
}

export class SkillType {
  sysName: string;
  name: string;
  description: string;
  enabled = false;
  subSkills = [] as string[];
  initHandler = null as null | SkillInitHandler;
  updateHandler = null as null | SkillUpdateHandler;

  constructor(params: SkillTypeParams) {
    this.sysName = params.sysName;
    this.name = params.name;
    this.description = params.description;
    this.enabled = params.enabled;
    if (params.subSkills) {
      this.subSkills = params.subSkills;
    }
    if (params.initHandler) {
      this.initHandler = params.initHandler;
    }
    if (params.updateHandler) {
      this.updateHandler = params.updateHandler;
    }
  }
}

export class Skill {
  subSkills = [] as Skill[];
  enabled = false;

  level = new Decimal('0');
  xp = new Decimal('0');
  xpPlus = new Decimal('1');
  xpRate = new Decimal('1.0');
  xpNeed = new Decimal('10');

  constructor(public type: SkillType) {}

  init(game: Game) {
    if (this.type.initHandler) {
      this.type.initHandler(game, this);
    }
  }

  update(game: Game) {
    if (this.type.updateHandler) {
      this.type.updateHandler(game, this);
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
    // TODO update skill effect
  }

  private updateXpNeed() {
    this.xpNeed = new Decimal('10')
      .plus(new Decimal('10').mul(this.level).pow('1.1'))
      .ceil();
  }
}
