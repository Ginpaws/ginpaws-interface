import {Connection, Keypair, PublicKey, SendOptions, Signer, Transaction, VersionedTransaction} from "@solana/web3.js";
import {InnerSimpleV0Transaction} from "./type";
import {
    buildSimpleTransaction,
    findProgramAddress,
    SPL_ACCOUNT_LAYOUT,
    TOKEN_PROGRAM_ID,
    TokenAccount,
} from '@raydium-io/raydium-sdk';
export function loadInnerSimpleV0Transaction(objarray: any): InnerSimpleV0Transaction[] {
    // load objarray to a InnerSimpleV0Transaction[]
    objarray.forEach((obj: any) => {
        if (obj.innerTransactions) {
            obj.innerTransactions.forEach((element: InnerSimpleV0Transaction) => {
                element.instructions = element.instructions.map((i: any) => {
                    i.programId = new PublicKey(i.programId);
                    if (i.keys) {
                        i.keys = i.keys.map((a: any) => {
                            a.pubkey = new PublicKey(a.pubkey);
                            return a;
                        });
                    }
                    if (i.data) {
                        i.data = Buffer.from(i.data, 'base64');
                    }
                    return i;
                });
            });
        }
    });
    return objarray;
}

export function combineInstructions(objarray: any) {
    // combine instructions to a single array
    const instructions: any = [];
    objarray.forEach((obj: any) => {
        if (obj.innerTransactions) {
            obj.innerTransactions.forEach((element: InnerSimpleV0Transaction) => {
                instructions.push({
                    instructions: element.instructions,
                    signers: element.signers,
                    instructionTypes: element.instructionTypes,
                });
            });
        }
    });
    return instructions;
}

export async function sendTx(
    connection: Connection,
    payer: Keypair | Signer,
    txs: (VersionedTransaction | Transaction)[],
    options?: SendOptions
): Promise<string[]> {
    const txids: string[] = [];
    for (const iTx of txs) {
        if (iTx instanceof VersionedTransaction) {
            iTx.sign([payer]);
            txids.push(await connection.sendTransaction(iTx, options));
        } else {
            txids.push(await connection.sendTransaction(iTx, [payer], options));
        }
    }
    return txids;
}
