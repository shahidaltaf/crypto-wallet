import * as actions from './actions';

describe('actions', () => {
    test('should create to set a filter keyword', () => {
        const expectedAction = {
            type: actions.SET_FILTER_KEYWORD,
            payload: 'keyword'
        }
        expect(actions.setFilterKeyword('keyword')).toEqual(expectedAction);
    });

    test('should create to set a Coin filter value', () => {
        const expectedAction = {
            type: actions.SET_FILTER_COIN,
            payload: 'BTC'
        }
        expect(actions.setFilterCoin('BTC')).toEqual(expectedAction);
    });

    test('should create to set a Coin filter value', () => {

        const prices = {
            BTC: 31873.21,
            ETH: 1
        }

        const btcTxs = [{
            amount: 212903,
            blockHeight: '',
            data: '',
            erc20: '',
            from: '',
            hash: '',
            insertedAt: '',
            state: '',
            to: '',
            txFee: '',
            type: ''
        }];

        const btcTxsTrans = [{
            to: '',
            from: '',
            amountFiat: '67.86',
            amountCrypto: '0.00212903',
            date: '1970-01-01T01:00:00+01:00',
            status: '',
            type: '',
            coin: 'BTC'
        }];

        const expectedAction = {
            type: actions.SET_TXS_DATA,
            payload: btcTxsTrans
        }
        expect(actions.setBtcData(btcTxs, prices)).toEqual(expectedAction);
    });
})