import Decimal from 'decimal.js';

export type UnitType = 'energy' | 'knowledges' | 'resources';

export class Unit {
  value = new Decimal('0');
  clickIsAllow = false;
  clickPower = new Decimal('1');
  clickPowerMul: Decimal;
  clickEnrgCostMul: Decimal;

  constructor(
    clickIsAllow: boolean,
    clickPowerMul: string,
    clickEnrgCostMul: string
  ) {
    this.clickIsAllow = clickIsAllow;
    this.clickPowerMul = new Decimal(clickPowerMul);
    this.clickEnrgCostMul = new Decimal(clickEnrgCostMul);
  }

  click() {
    if (!this.clickIsAllow) {
      return null;
    }
    const effect = this.getEffect();
    const cost = this.getCost(effect);
    return { effect, cost };
  }

  updateValue(diff: Decimal) {
    this.value = this.value.plus(diff);
  }

  getEffect() {
    return this.clickPower.mul(this.clickPowerMul);
  }

  getCost(effect?: Decimal) {
    if (!effect) {
      effect = this.getEffect();
    }
    return effect.mul(this.clickEnrgCostMul);
  }
}

export class UnitCost {
  value: Decimal;
  constructor(public type: UnitType, value: string) {
    this.value = new Decimal(value);
  }
}
