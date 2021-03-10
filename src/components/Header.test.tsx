import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    test('renders correct title text', () => {
        render(<Header title="Header text" />);
        expect(screen.getByText(/Header text/i)).toBeInTheDocument();
    });
});