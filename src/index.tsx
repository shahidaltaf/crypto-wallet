import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import storeReducer from './store/reducer';

const store = createStore(storeReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);