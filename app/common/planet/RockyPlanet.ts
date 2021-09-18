// TODO RockyPLanet
import * as THREE from 'three';
import { Planet } from './Planet';

export class RockyPlanet extends Planet {
    constructor(radius: number) {
        super(radius);
    }

    generateElevations(seed: number): Float64Array {
        // TODO generate rocky planet mesh
        return new Float64Array();
    }

    generateTexture(seed: number): THREE.Texture {
        // TODO
        return new THREE.Texture();
    }

    update(): void {
        // TODO planet draw functions
    }
}