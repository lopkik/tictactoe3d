export {};

declare global {
  // 0: neither player has taken that box
  // 1: player 1
  // 2: player 2
  export type playerId = 0 | 1 | 2;
}
