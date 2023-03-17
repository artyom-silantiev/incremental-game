import { Player } from './player';
import { getUpgrade, Upgrade } from './upgrade';
import { GU_CLICK_KNOWLEDGES } from './upgrades';

class GameUpgrades {
  constructor(private game: Game) {
    this.addUpgrade(GU_CLICK_KNOWLEDGES);
  }

  upgrades = new Map<string, Upgrade>();
  availableUpgrades = new Map<string, Upgrade>();

  hasUpgrade(upgradeName: string) {
    return this.upgrades.has(upgradeName);
  }

  addUpgrade(upgradeName: string) {
    const upgrade = getUpgrade(upgradeName);
    this.availableUpgrades.set(upgradeName, upgrade);
  }

  private delUpgrade(upgradeName: string) {
    this.availableUpgrades.delete(upgradeName);
  }

  upgradeIsAvailable(upgrade: Upgrade) {
    return upgrade.isAvailable(this.game);
  }

  tryBuyUpgrade(upgradeName: string) {
    const upgrade = this.availableUpgrades.get(upgradeName);

    if (!upgrade) {
      return new Error('Upgrade not found!');
    }

    const res = upgrade.tryBuy(this.game);
    if (res) {
      this.upgrades.set(upgradeName, upgrade);
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
