import {Vec3f} from '../util';

export abstract class Rendered {
    /** 
     * Base class for objects that will be rendered onto the screen.
     * Contains an abstract draw function.
     */

    position: Vec3f;
    direction: Vec3f;
    // TODO add mesh and texture fields

    constructor() {}

    // Draws object onto screen
    abstract draw(): void;
}