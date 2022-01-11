import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { boxes } from "./components/Box";

// just a comment
function App() {
  return (
    <div className='App'>
      <Canvas dpr={1.5} camera={{ position: [5, 5, -5] }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes}
      </Canvas>
    </div>
  );
}

export default App;
