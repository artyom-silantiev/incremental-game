import { ref } from 'vue';
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
      return;
    }
    const { effect, cost } = clickRes;

    if (type !== 'energy') {
      const energyUnit = this.get(U_ENERGY) as Unit;

      if (energyUnit.value.greaterThanOrEqualTo(cost)) {
        energyUnit.value = energyUnit.value.minus(cost);
      } else {
        return;
      }
    }

    unit.updateValue(effect);
  }
}

class GameUpgrades {
  upgrades = new Map<string, Upgrade>();
  availableUpgrades = new Map<string, Upgrade>();

  constructor(public game: Game) {
    this.addAvailableUpgrade(GU_CLICKS_KNOWLEDGE);
  }

  addAvailableUpgrade(upgradeName: string) {
    const upgrade = createUpgrade(upgradeName);
    this.availableUpgrades.set(upgradeName, upgrade);
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

class GameSkills extends Array<Skill> {
  constructor(public game: Game) {
    super();
    this.push(createSkillFromType(SK_CLICKS_BASE));
  }

  getSkillLevelOrZero(skillName: string) {
    const skill = this.find(
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

  update() {
    this.units.forEach((x) => x.update(this));
  }

  onClickUnit(unitType: string) {
    this.units.onClickUnit(unitType);
    this.upgrades.availableUpgrades.forEach((x) =>
      x.updateAvailableToBuy(this)
    );
  }

  onClickUpgrade(upgradeType: string) {
    const res = this.upgrades.tryBuyUpgrade(upgradeType);
    if (res) {
      this.update();
    }
  }
}
