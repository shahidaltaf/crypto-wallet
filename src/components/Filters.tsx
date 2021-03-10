import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../store/actions';
import { AppState } from  '../store/types'

import { Card, Col, Form } from 'react-bootstrap';

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector<AppState, AppState['filters']>(state => state.filters);

    const updateCoinFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterCoin(event.target.value));
    }

    const updateStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterStatus(event.target.value));
    }

    const updateTypeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterType(event.target.value));
    }

    const updateKeywordFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setFilterKeyword(event.target.value));
    }

    return <Card className="mb-4">
        <Card.Body>
            <Form.Row>
                <Col sm={12} md={6}>
                    <Form.Group controlId="filterSearch">
                        <Form.Label> Search</Form.Label>
                        <Form.Control type="text" value={filters.keyword} placeholder="Keyword search for 'Description' field" onChange={updateKeywordFilter} />
                    </Form.Group>
                    <Form.Group controlId="filterCoin">
                        <Form.Label>Coin</Form.Label>
                        <Form.Control as="select" value={filters.coin} onChange={updateCoinFilter}>
                            <option value="">All</option>
                            <option>BTC</option>
                            <option>ETH</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Group controlId="filterStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={filters.status} onChange={updateStatusFilter}>
                            <option value="">All</option>
                            <option>CONFIRMED</option>
                            <option>PENDING</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="filterType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={filters.type} onChange={updateTypeFilter}>
                            <option value="">All</option>
                            <option>buy</option>
                            <option>sell</option>
                            <option>sent</option>
                            <option>received</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Card.Body>
    </Card>;
}

export default Filters;