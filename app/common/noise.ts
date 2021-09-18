import * as THREE from 'three';


export function fractalNoise3D(x: number, y: number, z: number, freq: number,
                               noise: (x: number, y: number, z: number) => number,
                               octaves: number, lacunarity: number, persistence: number ): number
{
    let max = 0, min = 0, sum = 0, frq = freq/lacunarity/2, amp = 1/persistence;
    for (let o = 0; o < octaves; ++o) {
        sum += amp*noise(x*frq, y*frq, z*frq);

        max += amp;
        min -= amp;

        frq *= lacunarity;
        amp *= persistence;
    }
    return (sum - min)/(max - min);
}


export function fractalNoise3D_Spherical(theta: number, phi: number, r: number, freq: number,
                                         noise: (x: number, y: number, z: number) => number,
                                         octaves: number, lacunarity: number, persistence: number ): number {
    // Returns 3D noise value for spherical coordinates
    // phi is azimuthal angle, theta is polar angle
    let pos = new THREE.Vector3(r*Math.cos(phi), r*Math.tan(Math.PI/2 - theta), r*Math.sin(phi));
    let noiseOut = fractalNoise3D(pos.x, pos.y, pos.z, freq, noise, octaves, lacunarity, persistence);
    return Math.max(Math.min(noiseOut, 1), -1);
}
