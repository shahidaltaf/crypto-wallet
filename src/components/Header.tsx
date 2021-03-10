import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
    title: string
}

const Header: React.FC<Props> = ({title}) => {
    return <div className="text-white py-4 bg-primary">
        <Container fluid="lg">
            <Row>
                <Col>
                    <h1 className="m-0">{title}</h1>
                </Col>
            </Row>
        </Container>
    </div>;
}

export default Header;