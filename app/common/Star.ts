import * as THREE from 'three'
import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';

export class Star extends RigidBody implements Rendered, Luminous {
    /** 
     * Stores information about the solar system’s star.
     */
    mesh: THREE.Mesh;
    radius: number;
    luminosity: number;
    color: THREE.Color;

    constructor(radius: number, luminosity: number, color: THREE.Vector3, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(orbit_a, orbit_e, x_skew, y_skew);
        this.radius = radius;
        this.luminosity = luminosity;

        color = color.divideScalar(255);
        this.color = new THREE.Color(color.x, color.y, color.z);

        // TODO generate mesh
        const geometry = new THREE.SphereGeometry(this.radius);
        const material = new THREE.MeshStandardMaterial({
            'color': this.color
        });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    update() {} // TODO
}