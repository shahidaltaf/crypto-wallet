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

interface IPrices {
    BTC: number,
    ETH: number
}

interface IFilters {
    coin: string,
    keyword: string,
    status: string,
    type: string
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

type TransactionsState = {
    filters: IFilters,
    transactions: ITransaction[]
}

type Action = {
    type: string
    payload: any
}

type ResponsePayload = {
    btcTxs: INonCustodialTx[],
    ethTxs: INonCustodialTx[],
    custodialTxs: ICustodialTx[],
    prices: IPrices
}