import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './BackgroundAnimation.css';

// Floating particles component
function FloatingParticles({ count = 1000 }) {
  const mesh = useRef();
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return positions;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Geometric shapes representing robotics elements
function RoboticsGeometry() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe cubes representing robotic components */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.8) * 8,
            Math.cos(i * 0.6) * 6,
            Math.sin(i * 0.4) * 4
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial
            color="#00ff88"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      
      {/* Spheres representing sensors */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`sphere-${i}`}
          position={[
            Math.cos(i * 0.7) * 10,
            Math.sin(i * 0.5) * 8,
            Math.cos(i * 0.3) * 6
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color="#ff3366"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural network visualization
function NeuralNetwork() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  // Create neural network nodes
  const nodes = useMemo(() => {
    const nodePositions = [];
    const layers = 4;
    const nodesPerLayer = 6;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        nodePositions.push([
          (layer - layers / 2) * 3,
          (node - nodesPerLayer / 2) * 1.5,
          -15
        ]);
      }
    }
    return nodePositions;
  }, []);

  return (
    <group ref={group}>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Neural network connections */}
      {nodes.slice(0, -6).map((start, i) => {
        if ((i + 1) % 6 === 0) return null; // Skip last node of each layer
        const end = nodes[i + 6] || nodes[i + 1];
        return (
          <line key={`connection-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([...start, ...end])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#00ff88"
              transparent
              opacity={0.3}
            />
          </line>
        );
      })}
    </group>
  );
}

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
        performance={{ min: 0.5 }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff3366" />
        
        {/* Animated components */}
        <FloatingParticles count={800} />
        <RoboticsGeometry />
        <NeuralNetwork />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0f', 15, 30]} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
