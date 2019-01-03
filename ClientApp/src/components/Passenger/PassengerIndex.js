import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Table,} from 'reactstrap'
import {DeletePassenger, GetAllPassengers} from '../../api'
import {transporterParse} from '../../functions'

class PassengerIndex extends React.Component {
    constructor(props) {
        super(props)
        this.renderTransporter = this.renderTransporter.bind(this);
        this.deletePassenger = this.deletePassenger.bind(this);
        this.state = {
            passengers: []
        }
    }

    async componentDidMount() {
        await this.loadPassengers()
    }
    
    async loadPassengers() {
        const passengers = await GetAllPassengers()
        if (passengers !== false) {
            this.setState({passengers: passengers})
        }
    }

    renderTransporter(passenger) {
        const transporter = transporterParse(passenger)
        if (transporter !== null) {
            return (
                <Link to={`/transporters/${transporter.id}`}>{transporter.name}</Link>
            )
        }
        return (<span/>)
    }

    async deletePassenger(e) {
        e.preventDefault()
        const passengerIdToDelete = parseInt(e.target.getAttribute('data-id'))
        await DeletePassenger(passengerIdToDelete)
        await this.loadPassengers()
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Link to={'/passengers-create'} className={'btn btn-primary mb-3'}><span
                        className={'ml-1'}>+</span> Create Passenger</Link>
                    <Table striped bordered hover responsive>
                        <thead className={'thead-dark'}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Destination</th>
                            <th>Position In Time</th>
                            <th>Transporter</th>
                            <th><em>Actions</em></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.passengers.map(function (passenger, index) {
                            return <tr key={index}>
                                <td>{passenger.id}</td>
                                <td>{passenger.name}</td>
                                <td>{passenger.destination}</td>
                                <td>{passenger.positionInTime}</td>
                                <td>{this.renderTransporter(passenger)}</td>
                                <td>
                                    <Link to={`/passengers/${passenger.id}`}>view</Link>&nbsp;|&nbsp;<Link
                                    to={`/passengers/${passenger.id}/edit`}>edit</Link>&nbsp;|&nbsp;<a href="#"
                                                                                                   data-id={passenger.id}
                                                                                                   onClick={this.deletePassenger}>delete</a>
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

export default PassengerIndex;