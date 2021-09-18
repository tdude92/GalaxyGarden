import {Mesh} from 'three';
import {Vec3f} from '../util';

export interface Rendered {
    // Any object that will be rendered onto scene
    
    mesh: Mesh;

    // Draws object onto screen
    draw(position: Vec3f, direction: Vec3f): void;
}