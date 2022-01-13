import { useCursor } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGameStore } from "../store";

interface BoxProps extends MeshProps {
  box_id: number;
  boxState: number;
}

export function Box(props: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const updateGameState = useGameStore((state) => state.updateGameState);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) =>
    ref.current.scale.setScalar(
      hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1
    )
  );
  useCursor(hovered);

  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
        updateGameState(props.box_id, currentPlayer);
        console.log(props.box_id, props.boxState);
      }}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        roughness={1}
        color={clicked ? "hotpink" : hovered ? "aquamarine" : "lightgreen"}
        wireframe={props.box_id === 26}
      />
    </mesh>
  );
}
