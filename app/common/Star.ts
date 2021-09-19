import * as THREE from 'three'
import { Rendered } from './component/Rendered';
import { Luminous } from './component/Luminous';
import { PointLight } from 'three';
import { makeNoise3D } from 'open-simplex-noise';
import { fractalNoise3D_Spherical } from './noise';

export class Star implements Rendered, Luminous {
    /** 
     * Stores information about the solar system’s star.
     */
    mesh: THREE.Mesh;
    radius: number;
    luminosity: number;
    color: THREE.Color;

    light: THREE.PointLight;
    position: THREE.Vector3;

    tex_w: number;
    tex_h: number;

    // Initialized in subclasses
    max_elevation: number = -Infinity;
    min_elevation: number = Infinity;
    elevations: Float64Array;
    normalMap: THREE.Texture; // TODO generate
    tex: THREE.Texture;
    palette: Array<THREE.Color> = [];
    height_thresholds: Array<number> = [];

    constructor(radius: number, luminosity: number, color: THREE.Vector3, position: THREE.Vector3, scene: THREE.Scene, seed: number) {
        color = color.divideScalar(255);
        this.color = new THREE.Color(color.x, color.y, color.z);
        this.radius = radius;
        this.tex_w = radius*6; // Approximate pi = 3
        this.tex_h = this.tex_w/2;
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.radius), new THREE.MeshBasicMaterial({color: 0xffee8f}));
        scene.add( this.mesh );

        this.luminosity = luminosity;

        this.light = new PointLight(this.color, 1, 10000);
        this.position = position;
        this.light.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        scene.add( this.light );
        
    }

    update() {} // TODO
}