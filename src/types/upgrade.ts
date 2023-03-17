import { GameDb } from './db';
import { Game } from './game';
import { UnitCost } from './unit';

export type OnUpgradeBuy = (game: Game) => void;

export function defineUpgradeType(
  sysName: string,
  name: string,
  description: string,
  costs: UnitCost[],
  onBuy?: OnUpgradeBuy
) {
  GameDb.UpgradesTypes[sysName] = new UpgradeType(
    sysName,
    name,
    description,
    costs,
    onBuy || function (game: Game) {}
  );
  return sysName;
}

export function createUpgrade(upgradeName: string) {
  const upgradeType = GameDb.UpgradesTypes[upgradeName];
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
      if (game.player.units.get(cost.type)?.value.lessThan(cost.value)) {
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
      game.player.units.get(cost.type)?.updateValue(cost.value.mul('-1'));
    }
    this.type.onBuy(game);
    return true;
  }
}
