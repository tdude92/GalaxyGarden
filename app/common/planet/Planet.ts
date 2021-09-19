import * as THREE from 'three';
import { Rendered } from '../component/Rendered';
import { RigidBody } from '../component/RigidBody';

export abstract class Planet extends RigidBody implements Rendered {
    /** 
     * Base class that stores and handles information about a planet.
     * Abstract methods for generation tasks, which are offloaded to inheritors.
     */

    tex_w: number;
    tex_h: number;
    radius: number;

    // Initialized in subclasses
    elevations: Float64Array;
    normalMap: THREE.Texture; // TODO generate
    tex: THREE.Texture;
    mesh: THREE.Mesh;

    constructor(radius: number, seed: number, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(orbit_a, orbit_e, x_skew, y_skew);
        this.radius = radius;
        this.tex_w = radius*6; // Approximate pi = 3
        this.tex_h = this.tex_w/2;
        this.mesh = this.generateMesh(seed);
    }

    generateMesh(seed: number): THREE.Mesh {
        this.elevations = this.generateElevations(seed);
        this.tex = this.generateTexture(seed);
        
        const geometry = new THREE.SphereGeometry(this.radius); // TODO params
        const material = new THREE.MeshBasicMaterial({
            map: this.tex
            //normalMap: this.normalMap
        });

        return new THREE.Mesh(geometry, material);
    }

    abstract generateElevations(seed: number): Float64Array;
    abstract generateTexture(seed: number): THREE.Texture;
    abstract update(): void; // TODO
}