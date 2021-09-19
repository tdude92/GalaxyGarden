import * as THREE from 'three';

export interface Rendered {
    /** 
     * An object that will be rendered by three
     */
    mesh: THREE.Mesh;
    
    update(): void;
}