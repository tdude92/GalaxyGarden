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
    lI *= 0.995;

    arr[3*y*tex_w + 3*x + 0] = Math.floor(255*lI);
    arr[3*y*tex_w + 3*x + 1] = Math.floor(255*lI);
    arr[3*y*tex_w + 3*x + 2] = Math.floor(255*lI);

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