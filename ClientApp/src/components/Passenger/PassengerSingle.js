import React from 'react';
import {Row, Col, Table, Button, ButtonToolbar,} from 'reactstrap'
import './PassengerSingle.css';
import {GetPassenger} from '../../api'
import {transporterParse} from '../../functions'
import {Link} from 'react-router-dom'

class PassengerSingle extends React.Component{
    constructor(props) {
        super(props);

        this.renderTransporter = this.renderTransporter.bind(this);
        this.state = {
            id: this.props.match.params.id,
            passenger: {},
        };
    }
    async componentDidMount() {
        await this.loadPassenger()
    }
    
    async loadPassenger() {
        let passenger = await GetPassenger(this.state.id)
        if (passenger !== false) {
            this.setState({passenger: passenger})
        }
    }
    
    renderTransporter() {
        const transporter = transporterParse(this.state.passenger)
        if (transporter !== null) {
            return(
                <Link to={`/transporters/${transporter.id}`}>{transporter.name}</Link>
            )
        }
        return(<span />)
    }
    
    render() {
        return (
        <Row>
            <Col md={12}>
                <ButtonToolbar>
                    <Button bsStyle="primary" href={`/passengers/${this.state.id}/edit`}>Edit</Button>
                </ButtonToolbar>
                <br />
                <Table className={'table-single'}  striped bordered hover responsive>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{this.state.passenger.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{this.state.passenger.name}</td>
                        </tr>
                        <tr>
                            <th>Position in Time</th>
                            <td>{this.state.passenger.positionInTime}</td>
                        </tr>
                        <tr>
                            <th>Destination</th>
                            <td>{this.state.passenger.destination}</td>
                        </tr>
                        <tr>
                            <th>Transporter</th>
                            <td>{this.renderTransporter()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
        )
    }
}

export default PassengerSingle;