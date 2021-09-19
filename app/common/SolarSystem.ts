import * as THREE from 'three';
import { Rendered } from './component/Rendered';
import { RigidBody } from './component/RigidBody';
import { Luminous } from './component/Luminous';
import { random_normal, mulberry32, random_e } from './noise';
import { HabitablePlanet } from './planet/HabitablePlanet';
import { RockyPlanet } from './planet/RockyPlanet';
import { Planet } from './planet/Planet';
import { Star } from './Star';

const MAX_PLANETS:number = 6;
const SOLAR_SYSTEM_RADIUS:number = 8000;
const ORBIT_RADIUS_DEVIATION:number = 60;
const TYPICAL_PLANET_RADIUS:number = 100;
const SUN_RADIUS:number = 300;

export class SolarSystem {
    /**
     * Stores data on a solar system and handles all of its objects.
     */

    name: string;
    seed: number;
    sim_objects: RigidBody[];
    drawn_objects: Rendered[];
    luminous_objects: Luminous[];
    planets: Planet[];

    skybox_up:    THREE.Texture; // Skybox stored as 2d arrays of 3d vectors (ie. an RGB image)
    skybox_down:  THREE.Texture;
    skybox_left:  THREE.Texture;
    skybox_right: THREE.Texture;
    skybox_front: THREE.Texture;
    skybox_back:  THREE.Texture;

    star: Star;

    rand_fn: () => number;

    constructor(name: string, seed: number, scene: THREE.Scene) {
        this.name = name;
        this.seed = seed;
        // TODO Generate celestial bodies
        this.rand_fn = mulberry32(seed);
        let num_planets:number = Math.round(this.rand_fn()*(MAX_PLANETS-3))+3;
        let prev_apoapsis:number = 0;
        var orbit_a:number, orbit_e:number, planet_radius:number;
        this.planets = [];

        let prev_radius:number = SUN_RADIUS;

        for (var i = 0; i < num_planets; i++) {
            planet_radius = Math.round(Math.abs(random_normal(this.rand_fn)/4+1)*TYPICAL_PLANET_RADIUS + (this.rand_fn()-0.25)*200);

            while (true) {
                orbit_a = SOLAR_SYSTEM_RADIUS / 2. / num_planets * (i+1.) +
                          (this.rand_fn() - 0.5) * ORBIT_RADIUS_DEVIATION +
                          SUN_RADIUS;
                orbit_e = random_e(this.rand_fn);
                if (orbit_a*(1-orbit_e) > prev_apoapsis+planet_radius+prev_radius) {
                    break;
                }
            }

            prev_apoapsis = orbit_a*(1+orbit_e);
            prev_radius = planet_radius;
            let planet:Planet;
            if (this.rand_fn() > 0.75) {
                planet = new HabitablePlanet(planet_radius, seed*i*100, orbit_a, orbit_e, -Math.PI/3 + (this.rand_fn()-0.5)*Math.PI/6, 0);
            } else {
                planet = new RockyPlanet(planet_radius, seed*i*100, orbit_a, orbit_e, -Math.PI/3 + (this.rand_fn()-0.5)*Math.PI/6, 0);
            }
            this.planets.push(planet)
            planet.generateMoons(this.rand_fn, scene);
            scene.add( planet.mesh );
        }

        // TODO Generate Sun
        this.star = new Star(SUN_RADIUS, 100, new THREE.Vector3(255, 220, 180), new THREE.Vector3(0,0,0), scene, seed*100);
        // TODO Generate skybox
    }

    step_orbits(new_time:number):void {
        this.planets.forEach((obj) => obj.step(new_time));
        this.planets.forEach((obj) => obj.mesh.position.set(obj.position.x-obj.orbit.orbit_c, obj.position.y, obj.position.z)); // for my testing
        this.planets.forEach((obj) => obj.set_moon_mesh_positions());
        this.star.mesh.rotation.y += 0.007;
    }

    // Reading/Writing solar systems from disk (probably just store the seed)
    //static load(path: string): SolarSystem {return new SolarSystem(genHexstring(4), -1, F lol)} // TODO load from file
    save(path: string): void {} // TODO save to file

    update(): void {} // TODO draw function
}