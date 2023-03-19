import { createSkillFromType, Skill } from './skill';
import { SK_CLICKS_BASE } from './skills';
import { createUnit, Unit, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { createUpgrade, Upgrade } from './upgrade';
import { GU_CLICKS_KNOWLEDGE } from './upgrades';

export type GameUpdateHandler = (game: Game) => void;

class GameUnits extends Map<string, Unit> {
  constructor(public game: Game) {
    super();
    this.set(U_ENERGY, createUnit(U_ENERGY));
    this.set(U_KNOWLENGE, createUnit(U_KNOWLENGE));
    this.set(U_RESOURCE, createUnit(U_RESOURCE));
  }

  updateUnits() {
    this.forEach((x) => x.update(this.game));
  }

  enableClicksForUnit(unitName: string) {
    const unit = this.get(unitName);
    if (unit) {
      unit.clickIsAllow = true;
    }
  }

  unitIsAllowForClicks(type: string) {
    const unit = this.get(type);
    if (!unit) {
      throw new Error('Unit not found');
    }
    return unit.clickIsAllow;
  }

  onClickUnit(type: string) {
    const unit = this.get(type);

    if (!unit) {
      throw new Error('Unit not found');
    }

    const clickRes = unit.click();
    if (!clickRes) {
      return false;
    }
    const { effect, cost } = clickRes;

    if (type !== 'energy') {
      const energyUnit = this.get(U_ENERGY) as Unit;

      if (energyUnit.value.greaterThanOrEqualTo(cost)) {
        energyUnit.value = energyUnit.value.minus(cost);
      } else {
        return false;
      }
    }

    unit.updateValue(effect);
    return true;
  }
}

class GameUpgrades {
  upgrades = new Map<string, Upgrade>();
  availableUpgrades = new Map<string, Upgrade>();

  constructor(public game: Game) {
    this.addAvailableUpgrades([GU_CLICKS_KNOWLEDGE]);
  }

  updateAvailables() {
    this.availableUpgrades.forEach((x) => {
      x.updateAvailableToBuy(this.game);
    });
  }

  addAvailableUpgrades(upgradesNames: string[]) {
    for (const upgradeName of upgradesNames) {
      const upgrade = createUpgrade(upgradeName);
      this.availableUpgrades.set(upgradeName, upgrade);
    }
  }

  tryBuyUpgrade(upgradeName: string) {
    const upgrade = this.availableUpgrades.get(upgradeName);

    if (!upgrade) {
      throw new Error('Upgrade not found!');
    }

    const res = upgrade.tryBuy(this.game);
    if (res) {
      this.upgrades.set(upgradeName, upgrade);
      this.availableUpgrades.delete(upgradeName);
    }

    return res;
  }
}

class GameSkills {
  skills = [] as Skill[];

  constructor(public game: Game) {
    this.addMainSkill(SK_CLICKS_BASE);
  }

  onUnitClick(unitType: string) {
    this.skills
      .filter((skill) => skill.enabled)
      .forEach((skill) => {
        if (skill.type.onUnitClick) {
          skill.type.onUnitClick(this.game, skill, unitType);
        }
      });
  }

  addMainSkill(skillName: string) {
    const skill = createSkillFromType(skillName);
    this.skills.push(skill);
    skill.subSkills.forEach((subSkill) => {
      this.skills.push(subSkill);
    });
  }

  xpGain(skillName: string) {
    const skill = this.getSkill(skillName);
    if (skill) {
      if (skill.xpGain()) {
        this.game.update();
      }
    }
  }

  enableSkill(skillName: string) {
    const skill = this.getSkill(skillName);
    if (skill) {
      skill.enabled = true;
    }
  }

  getSkill(skillName: string) {
    const skill = this.skills.find((skill) => skill.type.sysName === skillName);
    return skill || null;
  }

  getSkillLevelOrZero(skillName: string) {
    const skill = this.skills.find(
      (skill) => skill.type.sysName === skillName && skill.enabled
    );
    return skill?.level || '0';
  }
}

export class Game {
  units: GameUnits;
  upgrades: GameUpgrades;
  skills: GameSkills;

  constructor() {
    this.units = new GameUnits(this);
    this.upgrades = new GameUpgrades(this);
    this.skills = new GameSkills(this);
  }

  init() {
    this.update();
  }

  update() {
    this.units.updateUnits();
    this.upgrades.updateAvailables();
  }

  onClickUnit(unitType: string) {
    const res = this.units.onClickUnit(unitType);

    if (!res) {
      return;
    }

    this.upgrades.updateAvailables();
    this.skills.onUnitClick(unitType);
  }

  onClickUpgrade(upgradeType: string) {
    const res = this.upgrades.tryBuyUpgrade(upgradeType);
    if (res) {
      this.update();
    }
  }
}
