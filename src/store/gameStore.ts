import { Vector3 } from "three";
import create from "zustand";

type GameStore = {
  gameState: gameState;
  currentPlayerId: 1 | 2;
  updateBoxGameState: (box_position: Vector3) => boolean;
  resetGameState: () => void;
};

const generateFreshGameState = (): gameState => {
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
  gameState: gameState,
  boxPosition: Vector3,
  playerId: playerId
) => {
  // have to add 1 to each axis to get the actual index from the position
  //  ex: [-1][1][0] => [0][2][1]
  gameState[boxPosition.x + 1][boxPosition.y + 1][boxPosition.z + 1] = playerId;
  return gameState;
};

const checkIfPlayerWon = (
  newGameState: gameState,
  currentPlayerId: playerId
) => {
  // checks z axis rows
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (
        newGameState[x][y].every(
          (boxPlayerId) => boxPlayerId === currentPlayerId
        )
      )
        return true;
    }
  }
  // checks x axis rows
  for (let y = 0; y < 3; y++) {
    for (let z = 0; z < 3; z++) {
      let xAxisMatch = true;
      for (let x = 0; x < 3; x++) {
        if (newGameState[x][y][z] !== currentPlayerId) xAxisMatch = false;
      }
      if (xAxisMatch) return true;
    }
  }
  // checks y axis rows
  for (let x = 0; x < 3; x++) {
    for (let z = 0; z < 3; z++) {
      let yAxisMatch = true;
      for (let y = 0; y < 3; y++) {
        if (newGameState[x][y][z] !== currentPlayerId) yAxisMatch = false;
      }
      if (yAxisMatch) return true;
    }
  }
  // checks x face diagonals
  for (let x = 0; x < 3; x++) {
    if (
      [
        newGameState[x][0][0],
        newGameState[x][1][1],
        newGameState[x][2][2],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
    if (
      [
        newGameState[x][0][2],
        newGameState[x][1][1],
        newGameState[x][2][0],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
  }
  // checks y face diagonals
  for (let y = 0; y < 3; y++) {
    if (
      [
        newGameState[0][y][0],
        newGameState[1][y][1],
        newGameState[2][y][2],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
    if (
      [
        newGameState[0][y][2],
        newGameState[1][y][1],
        newGameState[2][y][0],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
  }
  // checks z face diagonals
  for (let z = 0; z < 3; z++) {
    if (
      [
        newGameState[0][0][z],
        newGameState[1][1][z],
        newGameState[2][2][z],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
    if (
      [
        newGameState[0][2][z],
        newGameState[1][1][z],
        newGameState[2][0][z],
      ].every((playerId) => playerId === currentPlayerId)
    )
      return true;
  }

  return false;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: generateFreshGameState(),
  currentPlayerId: 1,
  updateBoxGameState: (boxPosition: Vector3): boolean => {
    // return whether the player won or not
    const currentPlayerId = get().currentPlayerId;
    const newGameState = updateBoxGameState(
      get().gameState,
      boxPosition,
      get().currentPlayerId
    );
    set((state) => ({
      ...state,
      gameState: newGameState,
      currentPlayerId: state.currentPlayerId === 1 ? 2 : 1,
    }));

    return checkIfPlayerWon(newGameState, currentPlayerId);
  },
  resetGameState: (): void => {
    set(() => ({
      gameState: generateFreshGameState(),
      currentPlayerId: 1,
    }));
  },
}));
