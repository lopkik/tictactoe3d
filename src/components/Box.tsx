import { useCursor } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGameStore } from "../store/gameStore";

interface BoxProps extends MeshProps {
  // box_id: number;
  // boxState: number;
  playerId: playerId;
}

export function Box(props: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const gameStore = useGameStore();
  const currentPlayer = useGameStore((state) => state.currentPlayerId);
  const updateGameState = useGameStore((state) => state.updateBoxGameState);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

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
        // setClicked(!clicked);
        gameStore.updateBoxGameState(ref.current.position);
        console.log("position:", ref.current.position);
      }}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        roughness={1}
        // color={clicked ? "hotpink" : hovered ? "aquamarine" : "lightgreen"}
        color={getBoxColor()}
        // wireframe={props.box_id === 26}
      />
    </mesh>
  );
}
