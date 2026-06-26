"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Points, PointMaterial, shaderMaterial } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- CUSTOM SHADERS ---

const AtmosphereMaterial = shaderMaterial(
  {
    color: new THREE.Color('#ff2d2d'),
    coeficient: 0.6,
    power: 2.5,
  },
  // Vertex Shader
  `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 color;
  uniform float coeficient;
  uniform float power;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(coeficient - dot(vNormal, vec3(0, 0, 1.0)), power);
    gl_FragColor = vec4(color, intensity * 1.5);
  }
  `
);

const CloudMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#ffffff'),
  },
  // Vertex Shader
  `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float time;
  uniform vec3 color;
  varying vec3 vPosition;
  
  float hash(vec3 p) {
      p  = fract( p*0.3183099+.1 );
      p *= 17.0;
      return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
  }
  
  float noise( in vec3 x ) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f*f*(3.0-2.0*f);
      return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                     mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                     mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }

  float fbm(vec3 x) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100.0);
      for (int i = 0; i < 5; ++i) {
          v += a * noise(x);
          x = x * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
    float n = fbm(vPosition * 1.5 + vec3(time * 0.03, time * 0.01, 0.0));
    float alpha = smoothstep(0.4, 0.8, n);
    gl_FragColor = vec4(color, alpha * 0.6);
  }
  `
);

// Register shaders with R3F
extend({ AtmosphereMaterial, CloudMaterial });

// --- COMPONENTS ---

function StarBackground(props: Record<string, unknown>) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 12 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#a1a1aa"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function CinematicPlanet() {
  const baseRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, camera } = useThree();
  const targetCameraPos = useMemo(() => new THREE.Vector3(0, 0, 8), []);

  useFrame((state, delta) => {
    // Slowly rotate planet base
    if (baseRef.current) {
      baseRef.current.rotation.y += delta * 0.05;
      baseRef.current.rotation.x += delta * 0.02;
    }

    // Animate clouds
    if (cloudRef.current) {
      cloudRef.current.uniforms.time.value += delta;
    }

    // Mouse parallax for camera
    targetCameraPos.x = THREE.MathUtils.lerp(targetCameraPos.x, mouse.x * 2, 0.05);
    targetCameraPos.y = THREE.MathUtils.lerp(targetCameraPos.y, mouse.y * 2, 0.05);
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraPos.x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraPos.y, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Base Dark Earth Surface */}
      <mesh ref={baseRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial 
          color="#050508" 
          roughness={0.9} 
          metalness={0.2}
        />
      </mesh>

      {/* Procedural Moving Clouds */}
      <mesh>
        <sphereGeometry args={[4.05, 64, 64]} />
        <cloudMaterial ref={cloudRef} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Fresnel Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[4.2, 64, 64]} />
        <atmosphereMaterial transparent blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>

      {/* Lighting for Base Material */}
      <pointLight position={[0, -2, -6]} intensity={100} color="#ff2d2d" distance={20} />
      <directionalLight position={[0, 5, 2]} intensity={0.8} color="#ffffff" />
      <spotLight position={[-5, 0, 5]} intensity={10} color="#7254ff" angle={0.5} penumbra={1} />
      <spotLight position={[5, 0, 5]} intensity={10} color="#b98b42" angle={0.5} penumbra={1} />
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      {/* Base Pure CSS Red Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-accent-primary/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <fog attach="fog" args={["#000000", 5, 20]} />
        <StarBackground />
        <CinematicPlanet />
        
        {/* Cinematic Post Processing */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            intensity={1.5} 
            mipmapBlur 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
