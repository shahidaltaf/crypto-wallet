import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Filters from './Filters';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Filters', () => {
    test('renders all filter inputs', () => {
        const store = mockStore({
            filters: {
                coin: '',
                keyword: '',
                status: '',
                type: ''
            },
            transactions: []
        });

        render(<Provider store={store}><Filters /></Provider>);

        expect(screen.getByLabelText('Search')).toBeInTheDocument();
        expect(screen.getByLabelText('Coin')).toBeInTheDocument();
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Type')).toBeInTheDocument();
    });
});