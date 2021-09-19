import * as THREE from 'three';
import { Orbit } from '../component/Orbit'

export abstract class RigidBody {
    /** 
     * Base class for any object that will be in motion
     */

    position: THREE.Vector3;
    solar_x_skew: THREE.Matrix4;
    solar_y_skew: THREE.Matrix4;

    // Rotation about axis
    axialTilt: number;
    angularSpeed: number;
    phi: number; // angle of rotation

    // Orbit
    orbit: Orbit;

    constructor(orbit_a:number, orbit_e:number, x_skew:number, y_skew:number) {
        this.solar_x_skew = new THREE.Matrix4().makeRotationX(x_skew);
        this.solar_y_skew = new THREE.Matrix4().makeRotationY(y_skew);
        this.orbit = new Orbit(orbit_a, orbit_e);
    }

    step(new_time:number): void {
        this.position = this.orbit.get_2d_coords(new_time)
        .applyMatrix4(this.solar_x_skew)
        .applyMatrix4(this.solar_y_skew);
    }
} 