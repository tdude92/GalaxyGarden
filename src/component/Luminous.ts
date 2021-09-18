import { Vec3f } from "../util";

export interface Luminous {
    /**
     * Base class for any object that will emit light.
     */

    luminosity: number; // Solar Luminosities
    color: Vec3f;
}