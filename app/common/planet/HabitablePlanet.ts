import * as THREE from 'three';
import { makeNoise3D } from 'open-simplex-noise';
import { fractalNoise3D_Spherical, mulberry32 } from '../noise';
import { Planet } from './Planet';
import { Palette, PaletteType } from '../palettes';

export class HabitablePlanet extends Planet {
    constructor(radius: number, seed: number, orbit_a: number, orbit_e: number, x_skew: number, y_skew: number) {
        super(radius, seed, orbit_a, orbit_e, x_skew, y_skew);
    }

    generateElevations(seed: number): Float64Array {
        // Generate elevations
        let elevations = new Float64Array(this.tex_w*this.tex_h);
        let min_elevation = Infinity, max_elevation = -Infinity;
        const noise = makeNoise3D(seed);
        let r_sphere = this.tex_w/(2*Math.PI);
        for (let y = 0.5; y < this.tex_h; ++y) {
            let theta = y*Math.PI/this.tex_h;
            let r_cylinder = r_sphere*Math.cos(Math.PI/2 - theta);
            for (let x = 0.5; x < this.tex_w; ++x) {
                let phi = x*2*Math.PI/this.tex_w;
                let noiseOut = fractalNoise3D_Spherical(theta, phi, r_cylinder, 0.05, noise, 4, 2, 0.5);

                elevations[(y - 0.5)*this.tex_w + (x - 0.5)] = noiseOut;

                min_elevation = Math.min(min_elevation, noiseOut);
                max_elevation = Math.max(max_elevation, noiseOut);
            }
        }

        // Normalize elevations to be between 0 and 1
        for (let y = 0; y < this.tex_h; ++y) {
            for (let x = 0; x < this.tex_w; ++x) {
                elevations[y*this.tex_w + x] = (elevations[y*this.tex_w + x] - min_elevation)/(max_elevation - min_elevation);
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
                let col = new THREE.Color(1, 1, 1);
                for (let i = 0; i < this.height_thresholds.length; ++i) {
                    if (elevation < this.height_thresholds[i]) {
                        col = this.palette.colors[i];
                        break;
                    }
                }
                texData[3*y*this.tex_w + 3*x + 0] = Math.floor(col.r*255);
                texData[3*y*this.tex_w + 3*x + 1] = Math.floor(col.g*255);
                texData[3*y*this.tex_w + 3*x + 2] = Math.floor(col.b*255);
            }
        }

        return new THREE.DataTexture(texData, this.tex_w, this.tex_h, THREE.RGBFormat);
    }

    generatePalette(seed: number): void {
        let rng = mulberry32(seed);

        this.palette = new Palette(PaletteType.HabitablePlanet, seed + 100);

        // Create thresholds
        let seaLevel = rng()*0.8;
        let diff = 1 - seaLevel;
        this.height_thresholds = [
            seaLevel,
            seaLevel + diff*0.5,
            seaLevel + diff*0.5 + diff*0.3,
            seaLevel + diff*0.5 + diff*0.3 + diff*0.2
        ];
    }

    update(): void {
        // TODO planet draw functions
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
}