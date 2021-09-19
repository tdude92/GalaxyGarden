import * as THREE from 'three';
import { mulberry32 } from './noise';

function flood_fill(arr: Uint8Array, rD: number, lI: number, x: number, y: number, tex_w: number, tex_h: number) {
    if (rD == 0) {
        return;
    }
    if (arr[3*y*tex_w + 3*x] != 0) {
        return;
    }

    rD--;
    lI *= 0.997;

    let cols: Array<THREE.Color> = [
        new THREE.Color(255, 255, 255),
        new THREE.Color(255, 238, 143),
        new THREE.Color(252, 252, 212),
        new THREE.Color(247, 171, 49),
        new THREE.Color(166, 234, 255),
        new THREE.Color(189, 47, 11),
        new THREE.Color(92, 131, 237)
    ];
    let col = cols[Math.floor(Math.random()*cols.length)];

    arr[3*y*tex_w + 3*x + 0] = col.r*lI;
    arr[3*y*tex_w + 3*x + 1] = col.g*lI;
    arr[3*y*tex_w + 3*x + 2] = col.b*lI;

    if (x > 0) {
        flood_fill(arr, rD, lI, x-1, y, tex_w, tex_h);
    }
    if (x < tex_w-1) {
        flood_fill(arr, rD, lI, x+1, y, tex_w, tex_h);
    }
    if (y > 0) {
        flood_fill(arr, rD, lI, x, y-1, tex_w, tex_h);
    }
    if (y < tex_h-1) {
        flood_fill(arr, rD, lI, x, y+1, tex_w, tex_h);
    }
}

export function generateTexture(seed: number, tex_w: number, tex_h: number): THREE.Texture {
    // Generate texture
    let texData = new Uint8Array(tex_w*tex_h*3);
    let rand_fn:() => number = mulberry32(seed);

    for (var i = 0; i < 20; i++) {
        flood_fill(texData, 10, 1, Math.floor(rand_fn()*tex_w), Math.floor(rand_fn()*tex_h), tex_w, tex_h);
    }

    return new THREE.DataTexture(texData, tex_w, tex_h, THREE.RGBFormat);
}