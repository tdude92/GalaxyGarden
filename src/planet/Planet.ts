import * as THREE from 'three';
import { Rendered } from '../component/Rendered';
import { RigidBody } from '../component/RigidBody';
import { Vec3f } from '../util';

export abstract class Planet extends RigidBody implements Rendered {
    /** 
     * Base class that stores and handles information about a planet.
     * Abstract methods for generation tasks, which are offloaded to inheritors.
     */

    radius: number;
    mesh: THREE.Mesh;

    constructor() {
        super();
    }

    abstract generateMesh(seed: number): void;

    draw(): void {
        // TODO planet draw functions
    }
}