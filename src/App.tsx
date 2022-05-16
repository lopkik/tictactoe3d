import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box";
import { useGameStore } from "./store/gameStore";

const posCoords = [0, 1, 2];

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
      <div>Player {gameStore.currentPlayerId}'s turn</div>

      <Canvas dpr={1.5} camera={{ position: [5, 5, -5] }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {posCoords.map((x) => {
          return posCoords.map((y) => {
            return posCoords.map((z) => {
              return (
                <Box
                  position={[x - 1, y - 1, z - 1]}
                  playerId={gameStore.gameState[x][y][z]}
                />
              );
            });
          });
        })}
      </Canvas>
    </div>
  );
}

export default App;
