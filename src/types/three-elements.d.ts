import { ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      atmosphereMaterial: any;
      cloudMaterial: any;
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    atmosphereMaterial: any;
    cloudMaterial: any;
  }
}
