import * as THREE from 'three';
import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';
import { genHexstring } from './utils';
import { random_normal, mulberry32, random_e } from './noise';
import { HabitablePlanet } from './planet/HabitablePlanet';

const MAX_PLANETS:number = 6;
const SOLAR_SYSTEM_RADIUS:number = 500;
const ORBIT_RADIUS_DEVIATION:number = 60;
const TYPICAL_PLANET_RADIUS:number = 20;

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

    skybox_up:    THREE.Texture; // Skybox stored as 2d arrays of 3d vectors (ie. an RGB image)
    skybox_down:  THREE.Texture;
    skybox_left:  THREE.Texture;
    skybox_right: THREE.Texture;
    skybox_front: THREE.Texture;
    skybox_back:  THREE.Texture;

    rand_fn: () => number;

    constructor(name: string, id: string, seed: number) {
        this.name = name;
        this.id = id;
        this.seed = seed;
        // TODO Generate celestial bodies
        this.rand_fn = mulberry32(seed);
        let num_planets:number = Math.round(this.rand_fn()*(MAX_PLANETS-1))+1;
        let prev_apoapsis:number = 0;
        var orbit_a:number, orbit_e:number, planet_radius:number;

        for (var i = 0; i < num_planets; i++) {
            planet_radius = Math.abs(random_normal(this.rand_fn)/4+1)*TYPICAL_PLANET_RADIUS;

            while (true) {
                orbit_a = SOLAR_SYSTEM_RADIUS / 2. / num_planets * (i+1) +
                          (this.rand_fn() - 0.5) * ORBIT_RADIUS_DEVIATION;
                orbit_e = random_e(this.rand_fn);
                if (orbit_a*(1-orbit_e) > prev_apoapsis+planet_radius) {
                    break;
                }
            }

            prev_apoapsis = orbit_a*(1+orbit_e);
            this.sim_objects.push(new HabitablePlanet(planet_radius, seed, orbit_a, orbit_e, 0, 0))
        }

        // TODO Generate Sun
        // TODO Generate skybox
    }

    // Reading/Writing solar systems from disk (probably just store the seed)
    static load(path: string): SolarSystem {return new SolarSystem(genHexstring(4), genHexstring(4), -1)} // TODO load from file
    save(path: string): void {} // TODO save to file

    update(): void {} // TODO draw function
}