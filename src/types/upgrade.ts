import { Game } from './game';
import { UnitCost } from './unit';

const upgradesTypes = {} as {
  [sysUpgradeTypeName: string]: UpgradeType;
};

export type OnUpgradeBuy = (game: Game) => void;

type UpgradeTypeParams = {
  sysName: string;
  name: string;
  description: string;
  costs: UnitCost[];
  onBuy?: OnUpgradeBuy;
};

export function defineUpgradeType(params: UpgradeTypeParams) {
  upgradesTypes[params.sysName] = new UpgradeType(params);
  return params.sysName;
}

export function createUpgrade(upgradeName: string) {
  const upgradeType = upgradesTypes[upgradeName];
  if (!upgradeType) {
    throw new Error('Upgrade type not found!');
  }
  const upgrade = new Upgrade(upgradeType);
  return upgrade;
}

export class UpgradeType {
  sysName: string;
  name: string;
  description: string;
  costs: UnitCost[];
  onBuy?: OnUpgradeBuy;

  constructor(params: UpgradeTypeParams) {
    this.sysName = params.sysName;
    this.name = params.name;
    this.description = params.description;
    this.costs = params.costs;
    this.onBuy = params.onBuy;
  }
}

export class Upgrade {
  availableToBuy = false;

  constructor(public type: UpgradeType) {}

  updateAvailableToBuy(game: Game) {
    for (const cost of this.type.costs) {
      if (game.units.get(cost.type)?.value.lessThan(cost.value)) {
        return (this.availableToBuy = false);
      }
    }
    return (this.availableToBuy = true);
  }

  tryBuy(game: Game) {
    if (!this.availableToBuy) {
      return false;
    }
    for (const cost of this.type.costs) {
      game.units.get(cost.type)?.updateValue(cost.value.mul('-1'));
    }
    if (this.type.onBuy) {
      this.type.onBuy(game);
    }
    return true;
  }
}
