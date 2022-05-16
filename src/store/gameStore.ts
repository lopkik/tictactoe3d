import { Vector3 } from "three";
import create from "zustand";

type GameStore = {
  gameState: playerId[][][];
  currentPlayerId: 1 | 2;
  updateBoxGameState: (box_position: Vector3) => void;
  resetGameState: () => void;
};

const generateFreshGameState = (): playerId[][][] => {
  return [
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ];
};

const updateBoxGameState = (
  gameState: playerId[][][],
  boxPosition: Vector3,
  playerId: playerId
) => {
  gameState[boxPosition.x + 1][boxPosition.y + 1][boxPosition.z + 1] = playerId;
  return gameState;
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: generateFreshGameState(),
  currentPlayerId: 1,
  updateBoxGameState: (boxPosition: Vector3): void => {
    set((state) => ({
      ...state,
      gameState: updateBoxGameState(
        state.gameState,
        boxPosition,
        state.currentPlayerId
      ),
      currentPlayerId: state.currentPlayerId === 1 ? 2 : 1,
    }));
  },
  resetGameState: (): void => {
    set((state) => ({
      gameState: generateFreshGameState(),
      currentPlayerId: 1,
    }));
  },
}));
