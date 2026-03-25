import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (props) => {
  const ref = useRef();
  
  // High-density star generation (original style)
  const [sphere] = useState(() => {
    const points = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      // Spread stars in a sphere with radius 1.2 for depth
      const r = 1.2 * Math.pow(Math.random(), 1/3);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      points[i3] = r * Math.sin(phi) * Math.cos(theta);
      points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i3 + 2] = r * Math.cos(phi);
    }
    return points;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const ShootingStar = () => {
  const ref = useRef();
  const materialRef = useRef();
  
  const [params] = useState(() => ({
    speed: Math.random() * 15 + 10, // fast movement
    delay: Math.random() * 3 + 1,
    lifetime: Math.random() * 0.4 + 0.2, // short lived
    timer: 0,
  }));

  const resetPosition = () => {
    return [
      (Math.random() - 0.5) * 8 - 2, // x
      (Math.random() - 0.5) * 4 + 4, // y
      (Math.random() - 0.5) * 2 - 1,   // z
    ];
  };

  const [position] = useState(resetPosition);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    if (params.timer < params.delay) {
      params.timer += delta;
      ref.current.visible = false;
      return;
    }

    const aliveTime = params.timer - params.delay;
    if (aliveTime > params.lifetime) {
      // Reset after full lifetime
      const [newX, newY, newZ] = resetPosition();
      ref.current.position.set(newX, newY, newZ);
      params.speed = Math.random() * 15 + 10;
      params.delay = Math.random() * 3 + 1;
      params.lifetime = Math.random() * 0.4 + 0.2;
      params.timer = 0;
      return;
    }

    ref.current.visible = true;
    ref.current.position.x += params.speed * delta;
    ref.current.position.y -= params.speed * delta;
    
    // Animate lifecycle: stretch then shrink, fade in then out
    const progress = aliveTime / params.lifetime;
    
    if (progress < 0.2) {
      // Growing head and tail
      ref.current.scale.y = Math.max(0.001, progress / 0.2);
    } else {
      // Shrinking to nothing
      ref.current.scale.y = Math.max(0.001, 1 - (progress - 0.2) / 0.8);
    }
    
    const opacity = progress < 0.2 ? (progress / 0.2) : Math.max(0, 1 - (progress - 0.2) / 0.8);
    if (materialRef.current) {
        materialRef.current.opacity = opacity * 0.8;
    }

    params.timer += delta;
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0, Math.PI / 4]}>
      {/* Offset so that the head remains exactly at the moving group origin */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0, 0.004, 1, 4]} />
        <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

const ShootingStars = () => {
  return (
    <group>
      {[...Array(7)].map((_, i) => (
        <ShootingStar key={`star-${i}`} />
      ))}
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-full fixed inset-0 z-[-1] pointer-events-none bg-primary'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
          <ShootingStars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
