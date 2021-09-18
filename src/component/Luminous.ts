import { Vec3f } from "../util";

export interface Luminous {
    /**
     * Base class for any object that will emit light.
     */

    luminosity: number;
    color: Vec3f;
}