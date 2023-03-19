import Decimal from 'decimal.js';
import { Game, GameEvent } from './game';

type SkillUpdateHandler = (game: Game, skill: Skill) => void;
type SkillGameEventHandler = (
  game: Game,
  skill: Skill,
  eventType: GameEvent,
  ...eventData: any[]
) => void;

const skillsTypes = {} as {
  [sysSkillTypeName: string]: SkillType;
};

type SkillTypeParams = {
  sysName: string;
  name: string;
  description: string;
  enabled: boolean;
  subSkills?: string[] | undefined;
  onUpdate?: SkillUpdateHandler;
  onGameEvent?: SkillGameEventHandler;
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
      subSkill.deep = skill.deep + 1;
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
  onUpdate = null as null | SkillUpdateHandler;
  onGameEvent = null as null | SkillGameEventHandler;

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
    if (params.onGameEvent) {
      this.onGameEvent = params.onGameEvent;
    }
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
