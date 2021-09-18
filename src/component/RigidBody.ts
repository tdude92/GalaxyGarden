import {Vec3f} from '../util';
import {Rendered} from "./Rendered";

export abstract class RigidBody extends Rendered {
    /** 
     * Base class for any object that will be in motion
     */

    theta: number;
    a: number;
    b: number;

    constructor(theta: number, a: number, b: number) {
        super();
        this.theta = theta;
        this.a = a;
        this.b = b;
    }

    orbit_step(): void {
        // Updates position of RigidBody by one time step
    }
}