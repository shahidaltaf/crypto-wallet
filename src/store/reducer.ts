import * as actions from './actions';

const initialState: AppState = {
    filters: {
        coin: '',
        keyword: '',
        status: '',
        type: ''
    },
    transactions: []
}

const storeReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {

        case actions.SET_FILTER_KEYWORD:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    keyword: action.payload
                }
            }

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

        case actions.SET_TXS_DATA:
            const sortedTxs = [...state.transactions, ...action.payload].sort((a:any, b:any) => Date.parse(b.date) - Date.parse(a.date));
            return {
                ...state,
                transactions: sortedTxs
            };

        default:
            return state;
    }
}

export default storeReducer;