// TODO GasPlanet
import * as THREE from 'three';
import { Planet } from './Planet';

export class GasPlanet extends Planet {
    constructor(radius: number) {
        super(radius);
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