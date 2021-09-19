import { randomBytes } from 'crypto';

// Utility functions
export function genHexstring(bytes: number): string {
    return randomBytes(bytes).toString('hex');
}


// Utility classes