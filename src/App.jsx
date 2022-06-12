import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Violin({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/violin.glb");
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });
  useFrame(() => {
    ref.current.position.set(data.x * width, (data.y += 0.02), z);

    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={nodes.Object_2.geometry}
      material={materials.Violino_My001}
      material-color="brown"
      material-emissive="brown"
    />
  );
}

function App({ count = 50 }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        {Array.from({ length: count }, (_, i) => (
          <Violin key={i} z={-i} scale={0.01} />
        ))}
        <EffectComposer>
          <DepthOfField targer={[0, 0, 40]} focalLength={0.3} bokehScale={4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default App;
