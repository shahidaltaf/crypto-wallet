export type Action = {
    type: string
    payload: any
}

export interface ITransaction {
    to: string,
    from: string,
    amountFiat: string,
    amountCrypto: string,
    date: string,
    status: string,
    type: string,
    coin: string
}

export interface IFilters {
    coin: string,
    keyword: string,
    status: string,
    type: string
}

export type AppState = {
    filters: IFilters,
    transactions: ITransaction[]
}

export interface IPrices {
    BTC: number,
    ETH: number
}

export interface INonCustodialTx {
    amount: number,
    blockHeight: string,
    data: string,
    erc20: boolean,
    from: string,
    hash: string,
    insertedAt: number,
    state: string,
    to: string,
    txFee: string,
    type: string
}

export interface ICustodialTx {
    id: string,
    pair: string,
    state: string,
    fiatValue: string,
    fiatCurrency: string,
    version: string,
    type: string,
    createdAt: string
}

export type ServerResponse = {
    prices: IPrices,
    custodialTxs: ICustodialTx[],
    btcTxs: INonCustodialTx[],
    ethTxs: INonCustodialTx[]
}

