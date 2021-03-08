import moment from 'moment';
import EtherConverter from 'ether-converter';
import SatoshiBitcoin from 'satoshi-bitcoin';

export const SET_TX_DATA = 'SET_TX_DATA';
export const SET_FILTER_COIN = 'SET_FILTER_COIN';
export const SET_FILTER_STATUS = 'SET_FILTER_STATUS';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

export const setFilterCoin = (value: string): Action => ({ type: SET_FILTER_COIN, payload: value});
export const setFilterStatus = (value: string): Action => ({ type: SET_FILTER_STATUS, payload: value});
export const setFilterType = (value: string): Action => ({ type: SET_FILTER_TYPE, payload: value});

export const setTxData = (payload: ResponsePayload) => {
    const btcTxs: ITransaction[] = payload.btcTxs.map(item => {
        const bitcoinValue = SatoshiBitcoin.toBitcoin(item.amount);
        const fiatValue = bitcoinValue * payload.prices.BTC;

        return {
            to: item.to,
            from: item.from,
            amountFiat: fiatValue.toFixed(2),
            amountCrypto: bitcoinValue.toFixed(8),
            date: moment.unix(item.insertedAt).format(),
            status: item.state,
            type: item.type,
            coin: 'BTC'
        }
    });

    const ethTxs: ITransaction[] = payload.ethTxs.map(item => {
        const etherValue = EtherConverter(item.amount, 'wei', 'ether');
        const fiatValue = etherValue * payload.prices.ETH;

        return {
            to: item.to,
            from: item.from,
            amountFiat: fiatValue.toFixed(2),
            amountCrypto: parseFloat(etherValue).toFixed(8),
            date: moment.unix(item.insertedAt).format(),
            status: item.state,
            type: item.type,
            coin: 'ETH'
        }
    });

    const custodialTxs: ITransaction[] = payload.custodialTxs.map(item => {
        const pair = item.pair.split('-');
        const coinType = pair[0] === 'USD' ? pair[1] : pair[0];
        const fiat = parseFloat(item.fiatValue)
        const units = coinType === 'BTC' ? (fiat / payload.prices.BTC) : (fiat / payload.prices.ETH) ;

        return {
            to: "-",
            from: "-",
            amountFiat: parseFloat(item.fiatValue).toFixed(2),
            amountCrypto: units.toFixed(8),
            date: moment(item.createdAt).format(),
            status: item.state,
            type: item.type,
            coin: coinType
        }
    });

    return ({ 
        type: SET_TX_DATA, 
        payload: { 
            prices: payload.prices,
            transactions: [...btcTxs, ...ethTxs, ...custodialTxs].sort((a:any, b:any) => Date.parse(b.date) - Date.parse(a.date))
        } 
    });
};




