// TODO GasPlanet
import * as THREE from 'three';
import { Planet } from './Planet';

export class GasPlanet extends Planet {
    constructor(radius: number) {
        super(radius);
    }

    generateMesh(seed: number): void {
        // TODO Generate gas planet mesh
    }

    update(): void {
        // TODO planet draw functions
    }
}