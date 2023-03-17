import { GameDb } from './db';
import { Game } from './game';
import { UnitCost } from './unit';

export type OnUpgradeBuy = (game: Game) => void;

export function defineUpgrade(
  sysName: string,
  name: string,
  description: string,
  costs: UnitCost[],
  onBuy: OnUpgradeBuy
) {
  GameDb.Upgrades[sysName] = new Upgrade(
    sysName,
    name,
    description,
    costs,
    onBuy
  );
  return sysName;
}

export function getUpgrade(upgradeName: string) {
  if (!GameDb.Upgrades[upgradeName]) {
    throw new Error('Upgrade not found!');
  }
  return GameDb.Upgrades[upgradeName];
}

export class Upgrade {
  costs: UnitCost[];
  onBuy: OnUpgradeBuy;

  constructor(
    public sysName: string,
    public name: string,
    public description: string,
    costs: UnitCost[],
    onBuy: OnUpgradeBuy
  ) {
    this.costs = costs;
    this.onBuy = onBuy;
  }

  isAvailable(game: Game) {
    for (const cost of this.costs) {
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
    for (const cost of this.costs) {
      game.player.units.get(cost.type)?.updateValue(cost.value.mul('-1'));
    }
    this.onBuy(game);
    return true;
  }
}
