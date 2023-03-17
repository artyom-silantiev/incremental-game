import Decimal from 'decimal.js';

const UnitsTypeDb = {} as {
  [sysUnitTypeName: string]: UnitType;
};

export function defineUnitType(
  sysUnitName: string,
  name: string,
  clickIsAllow: boolean,
  clickPowerMul: string,
  clickEnrgCostMul: string
) {
  const unit = new UnitType(
    sysUnitName,
    name,
    clickIsAllow,
    clickPowerMul,
    clickEnrgCostMul
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
  const unit = new Unit(
    unitType,
    unitType.clickIsAllow,
    unitType.clickPowerMul,
    unitType.clickEnrgCostMul
  );
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

  constructor(
    public type: UnitType,
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
  unitType: UnitType;
  constructor(public type: string, value: string) {
    this.unitType = getUnitType(type);
    this.value = new Decimal(value);
  }
}

export const U_ENERGY = defineUnitType(
  'U_ENERGY',
  'Energy',
  true,
  '1.0',
  '0.0'
);
export const U_KNOWLENGES = defineUnitType(
  'U_KNOWLENGES',
  'Knowlenges',
  false,
  '0.5',
  '1.0'
);
export const U_RESOURCES = defineUnitType(
  'U_RESOURCES',
  'Resources',
  false,
  '0.25',
  '2.0'
);
