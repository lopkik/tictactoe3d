import create from "zustand";

type GameStore = {
  gameState: number[];
  updateGameState: (box_id: number, player: number) => void;
  getGameState: () => number;
  resetGameState: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: new Array(27).fill(0),
  updateGameState: (box_id, player): void => {
    set((state) => ({
      gameState: state.gameState.map((box, i) => (i === box_id ? player : box)),
    }));
  },
  getGameState: (): number => {
    return 0;
  },
  resetGameState: (): void => {
    set((state) => ({
      gameState: new Array(27).fill(0),
    }));
  },
}));
