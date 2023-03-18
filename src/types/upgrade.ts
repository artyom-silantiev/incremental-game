import { Game } from './game';
import { UnitCost } from './unit';

const upgradesTypes = {} as {
  [sysUpgradeTypeName: string]: UpgradeType;
};

export type OnUpgradeBuy = (game: Game) => void;

export function defineUpgradeType(
  sysName: string,
  params: {
    name: string;
    description: string;
    costs: UnitCost[];
    onBuy?: OnUpgradeBuy;
  }
) {
  upgradesTypes[sysName] = new UpgradeType(
    sysName,
    params.name,
    params.description,
    params.costs,
    params.onBuy || function (game: Game) {}
  );
  return sysName;
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
  constructor(
    public sysName: string,
    public name: string,
    public description: string,
    public costs: UnitCost[],
    public onBuy: OnUpgradeBuy
  ) {}
}

export class Upgrade {
  constructor(public type: UpgradeType) {}

  isAvailable(game: Game) {
    for (const cost of this.type.costs) {
      if (game.units.get(cost.type)?.value.lessThan(cost.value)) {
        return false;
      }
    }
    return true;
  }

  tryBuy(game: Game) {
    if (!this.isAvailable(game)) {
      return false;
    }
    for (const cost of this.type.costs) {
      game.units.get(cost.type)?.updateValue(cost.value.mul('-1'));
    }
    this.type.onBuy(game);
    return true;
  }
}
