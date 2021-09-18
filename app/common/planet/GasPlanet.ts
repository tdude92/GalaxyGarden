// TODO GasPlanet
import * as THREE from 'three';
import { Planet } from './Planet';

export class GasPlanet extends Planet {
    constructor(radius: number, seed: number, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(radius, seed, orbit_a, orbit_e, x_skew, y_skew);
    }

    generateElevations(seed: number): Float64Array {
        // TODO
        return new Float64Array;
    }

    generateTexture(seed: number): THREE.Texture {
        // TODO Generate gas planet mesh
        return new THREE.Texture();
    }

    update(): void {
        // TODO planet draw functions
    }
}