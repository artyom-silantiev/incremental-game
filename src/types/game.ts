import { Player } from './player';
import { getUpgrade, Upgrade } from './upgrade';
import { GU_CLICK_KNOWLEDGES } from './upgrades';

class GameUpgrades {
  constructor(private game: Game) {
    this.addUpgrade(GU_CLICK_KNOWLEDGES);
  }

  upgrades = [] as Upgrade[];
  availableUpgrades = [] as Upgrade[];

  addUpgrade(upgradeName: string) {
    const upgrade = getUpgrade(upgradeName);
    this.availableUpgrades.push(upgrade);
  }

  private delUpgrade(upgradeName: string) {
    const index = this.availableUpgrades.findIndex(
      (u) => u.sysName === upgradeName
    );
    this.availableUpgrades.splice(index, 1);
  }

  upgradeIsAvailable(upgrade: Upgrade) {
    return upgrade.isAvailable(this.game);
  }

  tryBuyUpgrade(upgradeName: string) {
    const upgrade = this.availableUpgrades.find(
      (u) => u.sysName === upgradeName
    );

    if (!upgrade) {
      return new Error('Upgrade not found!');
    }

    const res = upgrade.tryBuy(this.game);
    if (res) {
      this.upgrades.push(upgrade);
      this.delUpgrade(upgrade.sysName);
    }
  }
}

export class Game {
  player = new Player();
  upgrades: GameUpgrades;

  constructor() {
    this.upgrades = new GameUpgrades(this);
  }
}
