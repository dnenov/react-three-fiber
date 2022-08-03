import React, { useRef, useState } from 'react';
import './App.scss';

import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { useDrag } from "react-use-gesture";

softShadows();

const SpinningMesh = ({position, args=[1,1,2.5,60], color='pink', speed=1}) => {  
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4,1.4,1.4] : [1,1,1],
  });

  return (
    <a.mesh 
      castShadow 
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      position={position} 
      ref={mesh}
      >
      <cylinderBufferGeometry attach='geometry' args={args}/>
      <MeshWobbleMaterial attach='material' color={color} speed={speed} fac={2}/>
    </a.mesh>
  );
}

function DraggableThing(){
  

  return(
    <mesh>
      <boxBufferGeometry attach='geometry'/>
      <meshToonMaterial attach='material' color='lightblue'/>
    </mesh>
  )
} 

function App() {
  return (
    <>
      <Canvas shadowMap colorManagement camera={{position: [-10, 2, 10], fov: 65}}>
        <ambientLight intensity={0.35}/>
        <pointLight position={[-10, 0, -20]} intensity={0.8} color='orange'/>
        <pointLight position={[-10, -10, 100]} intensity={1} color='lightblue'/>
        <directionalLight 
          castShadow
          position={[0,10,0]} 
          intensity={1} 
          shadow-mapSize-width={1024}
          shadow-mapSize-heigh={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={-10}
          shadow-camera-bottom={10}
        />

        <group>
          <mesh 
            receiveShadow 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0,-5,0]}>
            <circleBufferGeometry attach='geometry' args={[200, 12]}/>
            <shadowMaterial attach='material' opacity={0.3}/>
          </mesh>          
          <SpinningMesh position={[0,1,0]} args={[2,2,5,60]} color='white' speed={1}/>
          <SpinningMesh position={[-2,1,-5]} speed={4}/>
          <SpinningMesh position={[5,1,2]} speed={5}/>
        </group>
        <DraggableThing/>
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
