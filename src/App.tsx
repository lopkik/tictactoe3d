import { CycleRaycast, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { boxes, Box } from "./components/Box";

interface CycleRaycastObjects {
  objects: typeof Box[];
  cycle: number;
}

function App() {
  const [{ objects, cycle }, set] = useState<CycleRaycastObjects>({
    objects: [],
    cycle: 0,
  });

  return (
    <div className='App'>
      <div className='status'>
        {objects.map((_, i) => (
          <div
            key={i}
            className='dot'
            style={{ background: i === cycle ? "#70ffd0" : "#ccc" }}
          />
        ))}
        {objects.length ? (
          <div
            className='name'
            style={{ left: cycle * 14, padding: 2 }}
            children={objects[cycle].object.name}
          />
        ) : null}
      </div>
      <Canvas dpr={1.5}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes}
        {/* <CycleRaycast
          // onChanged={(objects, cycle) => set({ objects, cycle })}
          onChanged={(objects, cycle) => {
            console.log(objects, cycle);
            set({ objects, cycle });
            return null;
          }}
        /> */}
      </Canvas>
    </div>
  );
}

export default App;
