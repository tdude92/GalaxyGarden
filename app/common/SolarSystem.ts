import * as THREE from 'three';
import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';
import { genHexstring } from './utils';

export class SolarSystem {
    /**
     * Stores data on a solar system and handles all of its objects.
     */

    name: string;
    id: string;
    seed: number;
    sim_objects: RigidBody[];
    drawn_objects: Rendered[];
    luminous_objects: Luminous[];

    skybox_up:    THREE.Vector3[][]; // Skybox stored as 2d arrays of 3d vectors (ie. an RGB image)
    skybox_down:  THREE.Vector3[][];
    skybox_left:  THREE.Vector3[][];
    skybox_right: THREE.Vector3[][];
    skybox_front: THREE.Vector3[][];
    skybox_back:  THREE.Vector3[][];

    constructor(name: string, id: string, seed: number) {
        this.name = name;
        this.id = id;
        this.seed = seed;
        // TODO Generate celestial bodies
        // TODO Generate skybox
    }

    // Reading/Writing solar systems from disk (probably just store the seed)
    static load(path: string): SolarSystem {return new SolarSystem(genHexstring(4), genHexstring(4), -1)} // TODO load from file
    save(path: string): void {} // TODO save to file

    update(): void {} // TODO draw function
}