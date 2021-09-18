import * as THREE from 'three';
import { Vec3f } from "../util";

export interface Luminous {
    /**
     * Base class for any object that will emit light.
     */

    luminosity: number; // Solar Luminosities
    color: THREE.Color;
}