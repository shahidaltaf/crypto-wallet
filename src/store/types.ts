type Action = {
    type: string
    payload: any
}

interface ITransaction {
    to: string,
    from: string,
    amountFiat: string,
    amountCrypto: string,
    date: string,
    status: string,
    type: string,
    coin: string
}

interface IFilters {
    coin: string,
    keyword: string,
    status: string,
    type: string
}

type AppState = {
    filters: IFilters,
    transactions: ITransaction[]
}

interface IPrices {
    BTC: number,
    ETH: number
}

interface INonCustodialTx {
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

interface ICustodialTx {
    id: string,
    pair: string,
    state: string,
    fiatValue: string,
    fiatCurrency: string,
    version: string,
    type: string,
    createdAt: string
}

type ServerResponse = {
    prices: IPrices,
    custodialTxs: ICustodialTx[],
    btcTxs: INonCustodialTx[],
    ethTxs: INonCustodialTx[]
}

