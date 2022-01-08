import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const possibleCoords = [-1.2, 0, 1.2];

export const boxes = possibleCoords.map((coord0, i) => {
  return possibleCoords.map((coord1, j) => {
    return possibleCoords.map((coord2, k) => {
      return (
        <Box
          key={i * 9 + j * 3 + k}
          name={"box-" + (i * 9 + j * 3 + k)}
          position={[coord0, coord1, coord2]}
        />
      );
    });
  });
});

export function Box(props: any) {
  const ref = useRef<THREE.Mesh>(null!);
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
      onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        roughness={1}
        color={clicked ? "hotpink" : hovered ? "aquamarine" : "white"}
      />
    </mesh>
  );
}
