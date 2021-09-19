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

export function mulberry32(seed:number) : () => number {
    return function() : number {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export function random_normal(rand_fn:() => number) : number {
    let u = 0, v = 0;
    while(u === 0) u = rand_fn(); //Converting [0,1) to (0,1)
    while(v === 0) v = rand_fn();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return random_normal(rand_fn) // resample between 0 and 1
    return num
  }

  export function random_e(rand_fn:() => number) : number {
    let x:number = Math.abs(random_normal(rand_fn))/4.;
    return x < 0.9 ? x : 0;
  }

  export function random_moon_e(rand_fn:() => number) : number {
    let x:number = Math.abs(random_normal(rand_fn))/1.5;
    return x < 0.9 ? x : 0;
  }