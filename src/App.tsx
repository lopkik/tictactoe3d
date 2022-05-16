import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box";
import { useGameStore } from "./store/gameStore";

const possibleCoords = [-1.2, 0, 1.2];
const posCoords = [0, 1, 2];
const dummyVal = true;

function App() {
  const gameStore = useGameStore();

  return (
    <div className='App'>
      <div className='testDiv'>
        <button onClick={() => gameStore.resetGameState()}>reset</button>
        <button onClick={() => console.log(gameStore.gameState)}>
          get gameState
        </button>
      </div>

      <Canvas dpr={1.5} camera={{ position: [5, 5, -5] }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {posCoords.map((x, i) => {
          return posCoords.map((y, i) => {
            return posCoords.map((z, i) => {
              return (
                <Box
                  position={[x - 1, y - 1, z - 1]}
                  playerId={gameStore.gameState[x][y][z]}
                />
              );
            });
          });
        })}
        {/* {gameStore.gameState.map((array2D, x) => {
          return gameStore.gameState[x].map((array1D, y) => {
            return gameStore.gameState[x][y].map((gameStateValue, z) => {
              return (
                <Box
                  position={[x - 1, y - 1, z - 1]}
                  playerId={gameStateValue}
                />
              );
            });
          });
        })} */}
      </Canvas>
    </div>
  );
}

export default App;
