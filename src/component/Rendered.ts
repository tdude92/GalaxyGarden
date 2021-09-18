import * as THREE from 'three';
import { Vec3f } from '../util';

export interface Rendered {
    /** 
     * An object that will be rendered by three
     */
    mesh: THREE.Mesh;
}