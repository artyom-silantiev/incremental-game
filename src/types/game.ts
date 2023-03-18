import { Skill } from './skill';
import { createUnit, Unit, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';
import { createUpgrade, Upgrade } from './upgrade';
import { GU_CLICKS_KNOWLEDGE } from './upgrades';

class GameUnits extends Map<string, Unit> {
  constructor() {
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

  onUnitClick(type: string) {
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
  constructor(private game: Game) {
    this.addUpgrade(GU_CLICKS_KNOWLEDGE);
  }

  upgrades = new Map<string, Upgrade>();
  availableUpgrades = new Map<string, Upgrade>();

  hasUpgrade(upgradeName: string) {
    return this.upgrades.has(upgradeName);
  }

  addUpgrade(upgradeName: string) {
    const upgrade = createUpgrade(upgradeName);
    this.availableUpgrades.set(upgradeName, upgrade);
  }

  private delUpgrade(upgradeName: string) {
    this.availableUpgrades.delete(upgradeName);
  }

  upgradeIsAvailable(upgrade: Upgrade) {
    return upgrade.isAvailable(this.game);
  }

  tryBuyUpgrade(upgradeName: string) {
    const upgrade = this.availableUpgrades.get(upgradeName);

    if (!upgrade) {
      return new Error('Upgrade not found!');
    }

    const res = upgrade.tryBuy(this.game);
    if (res) {
      this.upgrades.set(upgradeName, upgrade);
      this.delUpgrade(upgrade.type.sysName);
    }
  }
}

class GameSkills extends Array<Skill> {
  constructor() {
    super();
    this.push();
  }
}

export class Game {
  units: GameUnits;
  upgrades: GameUpgrades;
  skills: GameSkills;

  constructor() {
    this.units = new GameUnits();
    this.upgrades = new GameUpgrades(this);
    this.skills = new GameSkills();
  }
}
