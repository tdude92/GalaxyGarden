import { randomBytes } from 'crypto';

// Utility functions
export function genHexstring(bytes: number): string {
    return randomBytes(bytes).toString('hex');
}


// Utility classes
export class Vec3f {
    // 3D vector class
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        // Default initializes to [0, 0, 0]
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Vector operations
    add(v: Vec3f): Vec3f {
        return new Vec3f(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v: Vec3f): Vec3f {
        return new Vec3f(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    scale(c: number): Vec3f {
        return new Vec3f(c*this.x, c*this.y, c*this.z);
    }

    dot(v: Vec3f): number {
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }

    cross(v: Vec3f): Vec3f {
        return new Vec3f(this.y*v.z - this.z*v.y, this.z*v.x - this.x*v.z, this.x*v.y - this.y*v.x);
    }

    magnitude(): number {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    unit(): Vec3f {
        return this.scale(1/this.magnitude());
    }
}