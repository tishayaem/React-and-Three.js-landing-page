import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Box() {
  const ref = useRef();
  const { viewport } = useThree();

  const [data, setData] = useState({
    x: 0,
    y: 0,
  });
  useFrame(() => {
    ref.current.position.set(0, (setData((data.y += 0.1)), 0));
    if (data.y > viewport.heigt / 1.5) {
      data.y = -viewport.heigt / 1.5;
    }
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
