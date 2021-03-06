import * as THREE from 'three';
import { Rendered } from '../component/Rendered';
import { RigidBody } from '../component/RigidBody';
import { Palette } from '../palettes';
import { Moon } from '../moon/Moon';
import { mulberry32, random_moon_e } from '../noise';

const TYPICAL_MOON_SIZE:number = 30;

export abstract class Planet extends RigidBody implements Rendered {
    /** 
     * Base class that stores and handles information about a planet.
     * Abstract methods for generation tasks, which are offloaded to inheritors.
     */

    tex_w: number;
    tex_h: number;
    radius: number;
    mesh: THREE.Mesh;
    moons: Moon[];

    rot_speed: number;
    time_offset: number;

    // Initialized in subclasses
    elevations: Float64Array;
    normalMap: THREE.Texture; // TODO generate
    tex: THREE.Texture;
    palette: Palette;
    height_thresholds: Array<number>;

    constructor(radius: number, seed: number, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(orbit_a, orbit_e, x_skew, y_skew);
        this.radius = radius;
        this.tex_w = radius*6; // Approximate pi = 3
        this.tex_h = this.tex_w/2;
        this.mesh = this.generateMesh(seed);
        this.rot_speed = mulberry32(seed)()*0.02 + 0.005;
        this.time_offset = mulberry32(seed*100)()*100000000;
    }

    generateMoons(rand_fn:() => number, scene: THREE.Scene): void {
        let num_moons: number = Math.round(rand_fn()*3);
        this.moons = [];
        while (num_moons) {
            let moon: Moon = new Moon(Math.round(TYPICAL_MOON_SIZE+(rand_fn()-0.5)*20), num_moons+100, 450+(rand_fn()-0.5)*100, random_moon_e(rand_fn),
                                        rand_fn()*2*Math.PI, rand_fn()*2*Math.PI);
            scene.add( moon.mesh );
            this.moons.push(moon)
            num_moons--;
        }
    }

    generateMesh(seed: number): THREE.Mesh {
        this.elevations = this.generateElevations(seed);
        this.generatePalette(seed);
        this.tex = this.generateTexture(seed);
        this.tex.magFilter = THREE.NearestFilter;
        
        const geometry = new THREE.SphereGeometry(this.radius); // TODO params
        const material = new THREE.MeshStandardMaterial({
            map: this.tex,
            displacementMap: this.tex,
            displacementScale: 100
        });

        return new THREE.Mesh(geometry, material);
    }

    override step(new_time:number): void {
        new_time += this.time_offset;
        this.position = this.orbit.get_2d_coords(new_time)
        .applyMatrix4(this.solar_x_skew)
        .applyMatrix4(this.solar_y_skew);


        this.moons.forEach((moon) => moon.step(new_time*0.6));
        this.mesh.rotation.y += this.rot_speed;
    }

    set_moon_mesh_positions(): void {
        this.moons.forEach((moon) => moon.mesh.position.set(
            moon.position.x+this.mesh.position.x-moon.orbit.orbit_c,
            moon.position.y+this.mesh.position.y,
            moon.position.z+this.mesh.position.z
            )
        );
    }

    abstract generateElevations(seed: number): Float64Array;
    abstract generateTexture(seed: number): THREE.Texture;
    abstract generatePalette(seed: number): void;
    abstract update(): void; // TODO
}