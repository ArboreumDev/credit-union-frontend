export interface Accounts {  address: Address;  name: string;}

export type Address = string;
export type Base64 = string;
export type TxHash = string;
export type EncodedTransaction = Base64 | Uint8Array;
// export type AlgorandTxn = PaymentTxn | AssetTxn | AssetConfigTxn | AssetCreateTxn | DestroyAssetTxn | FreezeAssetTxn | KeyRegTxn | ApplTxn;
export interface SignedTx {   txID: TxHash;   blob: Uint8Array;}