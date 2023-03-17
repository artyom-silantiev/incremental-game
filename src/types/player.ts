import { Unit, UnitType } from './unit';

class PlayerUnits {
  energy = new Unit(true, '1.0', '0');
  knowledges = new Unit(false, '0.5', '1.0');
  resources = new Unit(false, '0.25', '2.0');

  onUnitClick(type: UnitType) {
    const res = this[type].click();

    if (!res) {
      return;
    }

    const { effect, cost } = res;

    if (type !== 'energy') {
      if (this.energy.value.greaterThanOrEqualTo(cost)) {
        this.energy.value = this.energy.value.minus(cost);
      } else {
        return;
      }
    }

    this[type].updateValue(effect);
  }
}

export class Player {
  units: PlayerUnits;

  constructor() {
    this.units = new PlayerUnits();
  }
}
