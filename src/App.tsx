import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box";
import { useGameStore } from "./store";

const possibleCoords = [-1.2, 0, 1.2];

// just a comment
function App() {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <div className='App'>
      <div className='testDiv'>
        <button>reset</button>
      </div>

      <Canvas dpr={1.5} camera={{ position: [5, 5, -5] }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {possibleCoords.map((coord0, i) => {
          return possibleCoords.map((coord1, j) => {
            return possibleCoords.map((coord2, k) => {
              return (
                <Box
                  key={i * 9 + j * 3 + k}
                  position={[coord0, coord1, coord2]}
                  box_id={i * 9 + j * 3 + k}
                  boxState={gameState[i * 9 + j * 3 + k]}
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
