import Decimal from 'decimal.js';

const UnitsTypeDb = {} as {
  [sysUnitTypeName: string]: UnitType;
};

export function defineUnitType(
  sysUnitName: string,
  params: {
    name: string;
    clickIsAllow: boolean;
    clickPowerMul: string;
    clickEnrgCostMul: string;
  }
) {
  const unit = new UnitType(
    sysUnitName,
    params.name,
    params.clickIsAllow,
    params.clickPowerMul,
    params.clickEnrgCostMul
  );

  UnitsTypeDb[sysUnitName] = unit;

  return sysUnitName;
}

export function getUnitType(unitTypeName: string) {
  const unitType = UnitsTypeDb[unitTypeName];
  if (!unitType) {
    throw new Error('Unit type not found');
  }
  return unitType;
}

export function createUnit(unitTypeName: string) {
  const unitType = getUnitType(unitTypeName);
  const unit = new Unit(unitType);
  return unit;
}

export class UnitType {
  constructor(
    public sysName: string,
    public name: string,
    public clickIsAllow: boolean,
    public clickPowerMul: string,
    public clickEnrgCostMul: string
  ) {}
}

export class Unit {
  value = new Decimal('0');
  clickIsAllow = false;
  clickPower = new Decimal('1');
  clickPowerMul: Decimal;
  clickEnrgCostMul: Decimal;

  constructor(public type: UnitType) {
    this.clickIsAllow = type.clickIsAllow;
    this.clickPowerMul = new Decimal(type.clickPowerMul);
    this.clickEnrgCostMul = new Decimal(type.clickEnrgCostMul);
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
  unitType: UnitType;
  constructor(public type: string, value: string) {
    this.unitType = getUnitType(type);
    this.value = new Decimal(value);
  }
}

export const U_ENERGY = defineUnitType('U_ENERGY', {
  name: 'Energy',
  clickIsAllow: true,
  clickPowerMul: '1.0',
  clickEnrgCostMul: '0.0',
});
export const U_KNOWLENGE = defineUnitType('U_KNOWLENGE', {
  name: 'Knowlenges',
  clickIsAllow: false,
  clickPowerMul: '0.5',
  clickEnrgCostMul: '1.0',
});
export const U_RESOURCE = defineUnitType('U_RESOURCE', {
  name: 'Resources',
  clickIsAllow: false,
  clickPowerMul: '0.25',
  clickEnrgCostMul: '2.0',
});
