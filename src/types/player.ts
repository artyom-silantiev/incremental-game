import { Skill } from './skill';
import { createUnit, Unit, U_ENERGY, U_KNOWLENGE, U_RESOURCE } from './unit';

class PlayerUnits extends Map<string, Unit> {
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

class PlayerSkills extends Array<Skill> {
  constructor() {
    super();
    this.push();
  }
}

export class Player {
  units: PlayerUnits;

  constructor() {
    this.units = new PlayerUnits();
  }
}
