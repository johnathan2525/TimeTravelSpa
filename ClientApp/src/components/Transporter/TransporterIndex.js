import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Table} from 'reactstrap'
import {GetAllTransporters, DeleteTransporter} from '../../api'

export default class TransporterIndex extends React.Component {
    constructor(props) {
        super(props)
        this.deleteTransporter = this.deleteTransporter.bind(this);
        this.state = {
            transporters: []
        }
    }

    async componentDidMount() {
        await this.loadTransporters()
    }
    
    async loadTransporters() {
        let transporters = await GetAllTransporters()
        if (transporters !== false) {
            this.setState({transporters: transporters})
        }
    }

    async deleteTransporter(e) {
        e.preventDefault()
        const transporterToDelete = parseInt(e.target.getAttribute('data-id'))
        await DeleteTransporter(transporterToDelete)
        await this.loadTransporters()
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Link to={'/transporters-create'} className={'btn btn-primary mb-3'}><span
                        className={'ml-1'}>+</span> Create Transporter</Link>
                    <Table striped bordered hover>
                        <thead className={'thead-dark'}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th><em>Actions</em></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.transporters.map(function (transporter, index) {
                            return <tr key={index}>
                                <td>{transporter.id}</td>
                                <td>{transporter.name}</td>
                                <td>
                                    <Link to={`/transporters/${transporter.id}`}>view</Link>&nbsp;|&nbsp;<Link
                                    to={`/transporters/${transporter.id}/edit`}>edit</Link>&nbsp;|&nbsp;<a href="#" data-id={transporter.id} onClick={this.deleteTransporter} >delete</a>
                                    
                                </td>
                            </tr>;
                        }, this)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}