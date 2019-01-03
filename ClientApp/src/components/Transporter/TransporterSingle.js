import React from 'react';
import {Button, ButtonToolbar, Col, Row, Table} from 'reactstrap';
import './TransporterSingle.css';
import {GetTransporter} from '../../api'

export default class TransporterSingle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            transporter: {},
        };
    }
    
    async componentDidMount() {
        await this.loadTransporter()
    }
    
    async loadTransporter() {
        let transporter = await GetTransporter(this.state.id)
        if (transporter !== null) {
            this.setState({transporter: transporter})
        }
    }
    
    render() {
        return (
        <Row>
            <Col md={12}>
                <ButtonToolbar>
                    <Button bsStyle="primary" href={`/transporters/${this.state.id}/edit`}>Edit</Button>
                </ButtonToolbar>
                <br />
                <Table className={'table-single'}  striped bordered hover responsive>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{this.state.transporter.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{this.state.transporter.name}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
        )
    }
}