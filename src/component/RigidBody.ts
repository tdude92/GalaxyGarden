import { Vec3f } from '../util';

export abstract class RigidBody {
    /** 
     * Base class for any object that will be in motion
     */

    position: Vec3f;

    // Rotation about axis
    axialTilt: number;
    angularSpeed: number;
    phi: number; // angle of rotation

    // Orbit
    theta: number;
    a: number;
    b: number;

    constructor() {}

    orbit_step(): void { // TODO write orbit_step function
        // Updates position of RigidBody by one time step
    }
}