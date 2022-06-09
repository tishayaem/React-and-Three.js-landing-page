import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Box({ z }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });
  useFrame(() => {
    ref.current.position.set(data.x * width, (data.y += 0.5), z);

    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="lime" />
    </mesh>
  );
}

function Violin() {
  const { scene } = useGLTF("/public/violin-v1.glb");
  return <primitive object={scene} />;
}
function App({ count = 50 }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Violin scale={0.1}/>
      </Suspense>
      {/* {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))} */}
    </Canvas>
  );
}

export default App;
