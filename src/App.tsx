import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export const App = () => {

  const Box = (props:any) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    
    useFrame((state, delta) => {
      // @ts-ignore
      mesh.current.rotation.x += 0.01;
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        {/* <sphereGeometry args={[1, 10, 10]} /> */}
        <meshPhongMaterial color={hovered ? 'hotpink' : 'orange'} wireframe />
        {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      </mesh>
    );
  }
    
  return (
    <Canvas
      camera={{fov:50, position:[5,5,10], orthographic:false}}
    >
      <OrbitControls makeDefault />
      <gridHelper />

      <ambientLight />
      <pointLight position={[0, 10, 10]} />
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
    </Canvas>
  );
}  