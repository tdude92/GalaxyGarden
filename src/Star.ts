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
    color: THREE.Color;

    constructor(radius: number, luminosity: number, color: Vec3f) {
        super();
        this.radius = radius;
        this.luminosity = luminosity;

        color = color.scale(1/255);
        this.color = new THREE.Color(color.x, color.y, color.z);

        // TODO generate mesh
        const geometry = new THREE.SphereGeometry(this.radius);
        const material = new THREE.MeshStandardMaterial({
            'color': this.color
        });
        this.mesh = new THREE.Mesh(geometry, material);
    }
}