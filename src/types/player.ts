import { Unit, UnitType } from './unit';

export class Player {
  units = {
    energy: new Unit(true, '1.0', '0'),
    knowledges: new Unit(false, '0.5', '1.0'),
    resources: new Unit(false, '0.25', '2.0'),
  };

  onUnitClick(type: UnitType) {
    const res = this.units[type].click();

    if (!res) {
      return;
    }

    const { effect, cost } = res;

    if (type !== 'energy') {
      if (this.units.energy.value.greaterThanOrEqualTo(cost)) {
        this.units.energy.value = this.units.energy.value.minus(cost);
      } else {
        return;
      }
    }

    this.units[type].updateValue(effect);
  }
}
