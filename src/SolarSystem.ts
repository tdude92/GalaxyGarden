import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';
import { Vec3f, genHexstring } from './util';

export class SolarSystem implements Rendered {
    /**
     * Stores data on a solar system and handles all of its objects.
     */

    name: string;
    id: string;
    seed: number;
    sim_objects: RigidBody[];
    drawn_objects: Rendered[];
    luminous_objects: Luminous[];

    skybox_up:    Vec3f[][]; // Skybox stored as 2d arrays of 3d vectors (ie. an RGB image)
    skybox_down:  Vec3f[][];
    skybox_left:  Vec3f[][];
    skybox_right: Vec3f[][];
    skybox_front: Vec3f[][];
    skybox_back:  Vec3f[][];

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

    draw(position: Vec3f, direction: Vec3f): void {} // TODO draw function
}