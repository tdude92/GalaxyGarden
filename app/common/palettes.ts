import * as THREE from 'three';
import { mulberry32 } from './noise';

export enum PaletteType {
    HabitablePlanet = 1,
    Analogous,
    Complementary,
    SplitComplementary,
    Triad,
    Star
}

export class Palette {
    colors: any = []; // Objects of the form {h: [value, offset range (pos or neg)]}
                      // Updated into THREE.Color applying random shifts

    constructor(type: PaletteType, seed: number) {
        let rng = mulberry32(seed);

        switch (type) {
            case PaletteType.HabitablePlanet:
                this.colors.push({h: [180, 20], s: [30, 20], l: [40, 20]}); // Sea
                this.colors.push({h: [130, 20], s: [20, 20], l: [25, 20]}); // Lowlands
                this.colors.push({h: [165, 20], s: [20, 20], l: [20, 20]}); // Midlands
                this.colors.push({h: [200, 20], s: [15, 20], l: [10, 20]}); // Highlands
                break;
            case PaletteType.Analogous:
                let h = rng();
                this.colors.push({h: [h*360, 20], s: [50, 20], l: [20, 20]}); // Lowlands
                this.colors.push({h: [h*360 + 20, 10], s: [55, 20], l: [35, 20]}); // Midlands
                this.colors.push({h: [h*360 + 25, 10], s: [50, 20], l: [20, 20]}); // Highlands
                break;
            case PaletteType.Complementary:
                break;
            case PaletteType.SplitComplementary:
                break;
            case PaletteType.Triad:
                break;
            case PaletteType.Star:
                break;
        }

        for (let i = 0; i < this.colors.length; ++i) {
            let col = this.colors[i];
            this.colors[i] = new THREE.Color().setHSL(
                (col.h[0] + col.h[1]*rng())/360,
                (col.s[0] + col.s[1]*rng())/100,
                (col.l[0] + col.l[1]*rng())/100
            );
        }
    }
}
