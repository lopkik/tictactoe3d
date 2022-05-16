import { useCursor } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";

interface BoxProps extends MeshProps {
  playerId: playerId;
}

export function Box(props: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const gameStore = useGameStore();
  const [hovered, setHovered] = useState(false);

  useFrame((state) =>
    ref.current.scale.setScalar(
      hovered ? 0.8 + Math.sin(state.clock.elapsedTime * 10) / 50 : 0.8
    )
  );
  useCursor(hovered);

  const getBoxColor = () => {
    switch (props.playerId) {
      case 0:
        return "lightgreen";
      case 1:
        return "red";
      case 2:
        return "blue";
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        // if this box's playerId is not 0, return because a player
        // has already selected this box
        if (props.playerId) return;
        gameStore.updateBoxGameState(ref.current.position);
        // TODO: check if the game is won
      }}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(_) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={1} color={getBoxColor()} />
    </mesh>
  );
}
