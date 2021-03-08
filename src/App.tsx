import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Form, Card } from 'react-bootstrap';

import * as actions from './store/actions';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true); // @todo: More to redux/store..
    const dispatch = useDispatch();
    const filters = useSelector<TransactionsState, TransactionsState['filters']>(state => state.filters);
    const transactions = useSelector<TransactionsState, TransactionsState['transactions']>(state => {

        // @todo: keyword
        // @todo: order?

        return state.transactions.filter(item => 
            (item.coin === state.filters.coin || state.filters.coin === '') &&
            (item.status === state.filters.status || state.filters.status === '') && 
            (item.type === state.filters.type || state.filters.type === '')
        );
    });

    useEffect(() => {
        fetch('http://localhost:8888/all')
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                dispatch(actions.setTxData(response));
            })
            .catch(error => console.log(error));
    }, [dispatch]);

    const updateCoinFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterCoin(event.target.value));
    }

    const updateStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterStatus(event.target.value));
    }

    const updateTypeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterType(event.target.value));
    }

    return <Container fluid>
        <h1 className="mb-4">Transaction History</h1>
        {
            loading ? (<p>Loading...</p>) : (<>

                <Card className="mb-4">
                    <Card.Body>
                        <Form.Label>Search []</Form.Label>
                        <Form.Label>Coin</Form.Label>
                        <Form.Control as="select" value={filters.coin} onChange={updateCoinFilter}>
                            <option value="">All</option>
                            <option>BTC</option>
                            <option>ETH</option>
                        </Form.Control>

                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={filters.status} onChange={updateStatusFilter}>
                            <option value="">All</option>
                            <option>CONFIRMED</option>
                            <option>PENDING</option>
                            <option>FINISHED</option>
                        </Form.Control>

                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={filters.type} onChange={updateTypeFilter}>
                            <option value="">All</option>
                            <option>buy</option>
                            <option>sell</option>
                            <option>sent</option>
                            <option>received</option>
                        </Form.Control>
                    </Card.Body>
                </Card>

                {
                    transactions.length ? (<>
                        <p>Showing <strong>{transactions.length}</strong> transaction results.</p>
                        <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Coin</th>
                                <th>Amount (USD)</th>
                                <th>Amount (Crypto)</th>
                                <th>Status</th>
                                <th>Transaction Type</th>
                                <th>To</th>
                                <th>From</th>   
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.coin}</td>
                                        <td>{item.amountFiat}</td>
                                        <td>{item.amountCrypto}</td>
                                        <td>{item.status}</td>
                                        <td>{item.type}</td>
                                        <td>{item.to}</td>
                                        <td>{item.from}</td> 
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                    </>) : (
                        <p>No results.</p>
                    )
                }
            </>)
        }
    </Container>
};

export default App;