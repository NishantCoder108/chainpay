import { PublicKey } from "@solana/web3.js";

export function isValidSolanaAddress(address: string) {
    try {
        const publicKey = new PublicKey(address);

        // Check if the public key is on the Ed25519 curve
        return PublicKey.isOnCurve(publicKey);
    } catch (error) {
        return false;
    }
}
