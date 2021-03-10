import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { Container, Table, Spinner } from 'react-bootstrap';

import { fetchTxData } from '../services/api';
import * as actions from '../store/actions';
import Header from '../components/Header';
import Filters from '../components/Filters';

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const filters = useSelector<AppState, AppState['filters']>(state => state.filters);
    const transactions = useSelector<AppState, AppState['transactions']>(state => {
        return state.transactions.filter(item =>
            (item.from.includes(state.filters.keyword) || item.to.includes(state.filters.keyword) || state.filters.keyword === '') &&
            (item.coin === state.filters.coin || state.filters.coin === '') &&
            (item.status === state.filters.status || state.filters.status === '') &&
            (item.type === state.filters.type || state.filters.type === '')
        );
    });

    useEffect(() => {
        fetchTxData().then((response) => {
            setLoading(false);
            dispatch(actions.setCustodialData(response.custodialTxs, response.prices));
            dispatch(actions.setBtcData(response.btcTxs, response.prices));
            dispatch(actions.setEthData(response.ethTxs, response.prices));
        }).catch(errors => {
            setLoading(false);
            console.error(errors);
        });
    }, []);

    return <>
        <Header title="Transaction List" />
        <Container className="py-4" fluid="lg">
            {
                loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : (<>
                    <Filters />
                    {
                        transactions.length ? (<>
                            <h2 className="mb-3">
                                Showing {transactions.length} results{filters.keyword !== '' ? ` for keyword "${filters.keyword}"` : ''}.
                            </h2>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Coin</th>
                                        <th>Amount (USD)</th>
                                        <th>Amount (Crypto)</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th className="d-none d-md-table-cell">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{moment(item.date).format('DD MMM YYYY')}</td>
                                                <td>{item.coin}</td>
                                                <td>{item.amountFiat}</td>
                                                <td>{item.amountCrypto}</td>
                                                <td>{item.status}</td>
                                                <td>{item.type}</td>
                                                <td className="d-none d-md-table-cell">
                                                    {
                                                        item.to && item.from && <p className="mb-0">To: { item.to.substring(0, 25) }... <br/> From: { item.from.substring(0, 25) }...</p>
                                                    }
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </>) : (
                            <h2 className="mb-3">No results.</h2>
                        )
                    }
                </>)
            }
        </Container>
    </>
};

export default List;