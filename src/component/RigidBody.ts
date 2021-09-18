import { Vec3f } from '../util';

export abstract class RigidBody {
    /** 
     * Base class for any object that will be in motion
     */

    position: Vec3f;
    theta: number;
    a: number;
    b: number;

    constructor(position: Vec3f, theta: number, a: number, b: number) {
        this.position = position;
        this.theta = theta;
        this.a = a;
        this.b = b;
    }

    orbit_step(): void { // TODO write orbit_step function
        // Updates position of RigidBody by one time step
    }
}