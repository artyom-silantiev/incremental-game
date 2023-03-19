import Decimal from 'decimal.js';
import { Game } from './game';
import {
  SK_CLICKS_BASE,
  SK_CLICKS_ENERGY,
  SK_CLICKS_KNOWLEDGE,
  SK_CLICKS_RESOURCE,
} from './skills';

type UnitUpdateHandler = (game: Game, unit: Unit) => void;

const UnitsTypesDb = {} as {
  [sysUnitTypeName: string]: UnitType;
};

export function getUnitType(unitTypeName: string) {
  const unitType = UnitsTypesDb[unitTypeName];
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

type UnitTypeParams = {
  sysName: string;
  name: string;
  clickIsAllow: boolean;
  clickPowerMul: string;
  clickCostMul: string;
  updateHandler: UnitUpdateHandler;
};
export class UnitType {
  sysName: string;
  name: string;
  clickIsAllow: boolean;
  clickPowerMul: string;
  clickCostMul: string;
  updateHandler: UnitUpdateHandler;

  constructor(params: UnitTypeParams) {
    this.sysName = params.sysName;
    this.name = params.name;
    this.clickIsAllow = params.clickIsAllow;
    this.clickPowerMul = params.clickPowerMul;
    this.clickCostMul = params.clickCostMul;
    this.updateHandler = params.updateHandler;
    UnitsTypesDb[this.sysName] = this;
  }
}

export class Unit {
  value = new Decimal('0');

  clickIsAllow = false;
  clickPower = new Decimal('1');
  clickPowerMul: Decimal;
  clickCostMul: Decimal;

  constructor(public type: UnitType) {
    this.clickIsAllow = type.clickIsAllow;
    this.clickPowerMul = new Decimal(type.clickPowerMul);
    this.clickCostMul = new Decimal(type.clickCostMul);
  }

  update(game: Game) {
    this.type.updateHandler(game, this);
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
    return effect.mul(this.clickCostMul);
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

const GLOBAL_UNIT_POW_MUL = new Decimal('100.0');

function baseUnitUpdate(game: Game, unit: Unit) {
  const baseClickSkillLevel = game.skills.getSkillLevelOrZero(SK_CLICKS_BASE);
  unit.clickPower = new Decimal('1')
    .plus(baseClickSkillLevel)
    .mul(GLOBAL_UNIT_POW_MUL);
}

export const U_ENERGY = new UnitType({
  sysName: 'U_ENERGY',
  name: 'Energy',
  clickIsAllow: true,
  clickPowerMul: '1.0',
  clickCostMul: '0.0',
  updateHandler: (game, unit) => {
    baseUnitUpdate(game, unit);
    const mulSkillLv = game.skills.getSkillLevelOrZero(SK_CLICKS_ENERGY);
    unit.clickPowerMul = new Decimal(unit.type.clickPowerMul).mul(
      new Decimal('1').plus(new Decimal('0.02').mul(mulSkillLv))
    );
  },
}).sysName;

export const U_KNOWLENGE = new UnitType({
  sysName: 'U_KNOWLENGE',
  name: 'Knowlenges',
  clickIsAllow: false,
  clickPowerMul: '0.5',
  clickCostMul: '1.0',
  updateHandler: (game, unit) => {
    baseUnitUpdate(game, unit);
    const mulSkillLv = game.skills.getSkillLevelOrZero(SK_CLICKS_KNOWLEDGE);
    unit.clickPowerMul = new Decimal(unit.type.clickPowerMul).mul(
      new Decimal('1').plus(new Decimal('0.02').mul(mulSkillLv))
    );
  },
}).sysName;

export const U_RESOURCE = new UnitType({
  sysName: 'U_RESOURCE',
  name: 'Resources',
  clickIsAllow: false,
  clickPowerMul: '0.25',
  clickCostMul: '2.0',
  updateHandler: (game, unit) => {
    baseUnitUpdate(game, unit);
    const mulSkillLv = game.skills.getSkillLevelOrZero(SK_CLICKS_RESOURCE);
    unit.clickPowerMul = new Decimal(unit.type.clickPowerMul).mul(
      new Decimal('1').plus(new Decimal('0.02').mul(mulSkillLv))
    );
  },
}).sysName;
