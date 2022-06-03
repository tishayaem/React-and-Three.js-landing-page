import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box() {
  const ref = useRef();
  useFrame(() => {
    ref.current.position.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="lime" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <Box />
    </Canvas>
  );
}

export default App;
