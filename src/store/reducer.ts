import * as actions from './actions';

const initialState: TransactionsState = {
    filters: {
        coin: '',
        keyword: '',
        status: '',
        type: ''
    },
    transactions: []
}

const storeReducer = (state: TransactionsState = initialState, action: Action) => {
    switch (action.type) {

        case actions.SET_FILTER_COIN:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    coin: action.payload
                }
            }

        case actions.SET_FILTER_STATUS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }

        case actions.SET_FILTER_TYPE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    type: action.payload
                }
            }

        case actions.SET_TX_DATA:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

export default storeReducer;