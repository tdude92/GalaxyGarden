import * as THREE from 'three'
import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';
import { Vec3f } from './util';

export class Star extends RigidBody implements Rendered, Luminous {
    /** 
     * Stores information about the solar system’s star.
     */
    mesh: THREE.Mesh;
    radius: number;
    luminosity: number;
    color: Vec3f;

    constructor(radius: number, luminosity: number, color: Vec3f) {
        super();
        this.radius = radius;
        this.luminosity = luminosity;
        this.color = color;

        // TODO generate mesh
    }

    draw(): void {} // TODO Star draw function
}