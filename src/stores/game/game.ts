import { defineStore } from 'pinia';
import { Game } from './types/game';

export const useGameStore = defineStore('game', () => {
  const game = new Game();

  return {
    game,
  };
});
