import * as actions from './actions';
import reducer from './reducer';



describe('reducer', () => {
    const initialState = {
        filters: {
            coin: '',
            keyword: '',
            status: '',
            type: ''
        },
        transactions: []
    }

    it('should return the initial state', () => {
        expect(reducer(initialState, {type: '', payload: ''})).toEqual(initialState);
    });

    it('should return update state', () => {
        expect(reducer(initialState, {type: actions.SET_FILTER_COIN, payload: 'BTC'})).not.toEqual(initialState);
    });

    it('should return update filter Coin state', () => {
        const initialState = {
            filters: {
                coin: 'BTC',
                keyword: '',
                status: '',
                type: ''
            },
            transactions: []
        }
        expect(reducer(initialState, {type: actions.SET_FILTER_COIN, payload: 'BTC'})).toEqual(initialState);
    });
});