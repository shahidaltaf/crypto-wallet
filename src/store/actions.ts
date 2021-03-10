import moment from 'moment';
import EtherConverter from 'ether-converter';
import SatoshiBitcoin from 'satoshi-bitcoin';

import { Action, ICustodialTx, INonCustodialTx, IPrices } from './types';

export const SET_TXS_DATA = 'SET_TXS_DATA';
export const SET_FILTER_KEYWORD = 'SET_FILTER_KEYWORD';
export const SET_FILTER_COIN = 'SET_FILTER_COIN';
export const SET_FILTER_STATUS = 'SET_FILTER_STATUS';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

export const setFilterKeyword = (value: string): Action => ({ type: SET_FILTER_KEYWORD, payload: value});
export const setFilterCoin = (value: string): Action => ({ type: SET_FILTER_COIN, payload: value});
export const setFilterStatus = (value: string): Action => ({ type: SET_FILTER_STATUS, payload: value});
export const setFilterType = (value: string): Action => ({ type: SET_FILTER_TYPE, payload: value});

export const setCustodialData = (payload: ICustodialTx[], prices: IPrices): Action => {
    const custodialTxs = payload.map(item => {
        const pair = item.pair.split('-');
        const coinType = pair[0] === 'USD' ? pair[1] : pair[0];
        const fiat = parseFloat(item.fiatValue)
        const units = coinType === 'BTC' ? (fiat / prices.BTC) : (fiat / prices.ETH) ;

        return {
            to: '',
            from: '',
            amountFiat: parseFloat(item.fiatValue).toFixed(2),
            amountCrypto: units.toFixed(8),
            date: moment(item.createdAt).format(),
            status: item.state === 'FINISHED' ? 'CONFIRMED' : item.state,
            type: item.type,
            coin: coinType
        }
    });

    return {
        type: SET_TXS_DATA,
        payload: custodialTxs
    }
}

export const setBtcData = (payload: INonCustodialTx[], prices: IPrices): Action => {
    const btcTxs = payload.map(item => {
        const bitcoinValue = SatoshiBitcoin.toBitcoin(item.amount);
        const fiatValue = bitcoinValue * prices.BTC;

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

    return {
        type: SET_TXS_DATA,
        payload: btcTxs
    }
}

export const setEthData = (payload: INonCustodialTx[], prices: IPrices): Action => {
    const ethTxs = payload.map(item => {
        const etherValue = EtherConverter(item.amount, 'wei', 'ether');
        const fiatValue = etherValue * prices.ETH;

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

    return {
        type: SET_TXS_DATA,
        payload: ethTxs
    }
}