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

    constructor(radius: number, luminosity: number, color: Vec3f, position: Vec3f = new Vec3f(),
                theta: number = 0, a: number = 0, b: number = 0) {
        super(position, theta, a, b);
        this.radius = radius;
        this.luminosity = luminosity;
        this.color = color;

        // TODO generate mesh
    }

    draw(position: Vec3f, direction: Vec3f): void {} // TODO
}