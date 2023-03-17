import { Skill } from './skill';
import { Upgrade } from './upgrade';

type SlillsDb = {
  [sysSkillName: string]: Skill;
};
type UpgradesDb = {
  [sysUpgradeName: string]: Upgrade;
};

export const GameDb = {
  Skills: {} as SlillsDb,
  Upgrades: {} as UpgradesDb,
};
