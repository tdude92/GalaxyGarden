import { Vec3f } from '../util';

export interface Rendered {
    // Draws object onto screen
    draw(position: Vec3f, direction: Vec3f): void;
}