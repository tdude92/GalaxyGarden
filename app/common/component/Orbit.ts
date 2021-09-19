import * as THREE from 'three';

export class Orbit {
    orbit_a: number; // semi-major axis
    orbit_b: number; // semi-minor axis
    orbit_e: number; // eccentricity
    orbit_E: number; // eccentric anomaly
    orbit_c: number; // focus

    static solve_E(t:number, a:number, mu:number, e:number) : number {
        let E : number = 0.;
        let coef : number = Math.sqrt(a*a*a/mu);
        var f : number, fp : number;

        let steps : number = 50;
        while (steps > 0) {
            f = coef*(E-e*Math.sin(E))-t;
            fp = coef*(1-e*Math.cos(E));
            E -= f/fp;

            steps--;
        }

        return E % (Math.PI*2.);
    }

    constructor(a:number, e:number) {
        this.orbit_a = a;
        this.orbit_e = e;
        this.orbit_b = a * Math.sqrt(1-e*e);
        this.orbit_c = Math.sqrt(a*a-this.orbit_b*this.orbit_b);
    }

    get_2d_coords(t:number) : THREE.Vector3 {
        this.orbit_E = Orbit.solve_E(t, this.orbit_a, 0.01, this.orbit_e);
        //console.log(this.orbit_a*Math.cos(this.orbit_E));
        //console.log(this.orbit_b*Math.sin(this.orbit_E));
        return new THREE.Vector3(
            this.orbit_a*Math.cos(this.orbit_E),
            this.orbit_b*Math.sin(this.orbit_E),
            0
        );
    }
}