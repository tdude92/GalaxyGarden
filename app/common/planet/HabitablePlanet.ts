// TODO HabitablePlanet
import * as THREE from 'three';
import { makeNoise3D } from 'open-simplex-noise';
import { fractalNoise3D_Spherical } from '../noise';
import { Planet } from './Planet';

export class HabitablePlanet extends Planet {
    constructor(radius: number, seed: number, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(radius, seed, orbit_a, orbit_e, x_skew, y_skew);
    }

    generateElevations(seed: number): Float64Array {
        // Generate elevations
        let elevations = new Float64Array(this.tex_w*this.tex_h);
        const noise = makeNoise3D(seed);
        let r_sphere = this.tex_w/(2*Math.PI);
        for (let y = 0.5; y < this.tex_h; ++y) {
            let theta = y*Math.PI/this.tex_h;
            let r_cylinder = r_sphere*Math.cos(Math.PI/2 - theta);
            for (let x = 0.5; x < this.tex_w; ++x) {
                let phi = x*2*Math.PI/this.tex_w;
                let noiseOut = fractalNoise3D_Spherical(theta, phi, r_cylinder, 0.1*this.tex_w/100, noise, 4, 2, 0.4);
                elevations[(y - 0.5)*this.tex_w + (x - 0.5)] = noiseOut;
            }
        }
        return elevations;
    }
    
    generateTexture(seed?: number): THREE.Texture {
        // Generate texture
        let texData = new Uint8Array(this.tex_w*this.tex_h*3);

        for (let y = 0; y < this.tex_h; ++y) {
            for (let x = 0; x < this.tex_w; ++x) {
                let elevation = this.elevations[y*this.tex_w + x];

                texData[y*this.tex_w + x + 0] = Math.floor(elevation*255); // TODO add colours
                texData[y*this.tex_w + x + 1] = Math.floor(elevation*255);
                texData[y*this.tex_w + x + 2] = Math.floor(elevation*255);
            }
        }

        return new THREE.DataTexture(texData, this.tex_w, this.tex_h, THREE.RGBFormat);
    }

    update(): void {
        // TODO planet draw functions
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}