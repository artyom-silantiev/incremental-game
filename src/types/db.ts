import { Skill } from './skill';
import { UpgradeType } from './upgrade';

type SlillsDb = {
  [sysSkillName: string]: Skill;
};
type UpgradesTypesDb = {
  [sysUpgradeName: string]: UpgradeType;
};

export const GameDb = {
  Skills: {} as SlillsDb,
  UpgradesTypes: {} as UpgradesTypesDb,
};
