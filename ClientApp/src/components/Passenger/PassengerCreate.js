import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {CreatePassenger, GetAllTransporters, } from '../../api'

export default class PassengerCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.state = {
            passenger: {
                name: '',
                positionInTime: '',
                destination: '',
                transporterId: null,
            },
            transporters: [],
        };
    }

    async componentDidMount() {
        let transporters = await GetAllTransporters();
        if (transporters !== false) {
            this.setState({transporters: transporters})
        }
    }

    handleChanges(e) {
        let key = e.target.getAttribute('id')
        let passengerCopy = Object.assign({}, this.state.passenger);
        if (key === 'transporterId') {
            passengerCopy[`${key}`] = parseInt( e.target.value);
        } else {
            passengerCopy[`${key}`] = e.target.value;
        }
        this.setState({passenger: passengerCopy});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let passenger = await CreatePassenger(this.state.passenger)
        if (passenger !== false) {
            this.props.history.push(`/passengers/${passenger.id}`)
        }
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Add Passenger</h1>
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup>
                            <Label for={'name'}>Name</Label>
                            <Input id={'name'} type={'text'} minLength={5} value={this.state.passenger.name} onChange={this.handleChanges} />
                        </FormGroup>

                        <FormGroup>
                            <Label for={'positionInTime'}>Position in Time</Label>
                            <Input id={'positionInTime'} type={'date'} minLength={5} value={this.state.passenger.positionInTime} onChange={this.handleChanges} />
                        </FormGroup>

                        <FormGroup>
                            <Label for={'destination'}>Destination</Label>
                            <Input id={'destination'} type={'text'} minLength={5} value={this.state.passenger.destination} onChange={this.handleChanges} />
                        </FormGroup>

                        <FormGroup>
                            <Label for={'transporterId'}>Transporter</Label>
                            <Input id={'transporterId'} value={this.state.passenger.transporterId} type="select" onChange={this.handleChanges}>
                                <option value={null} />
                                {this.state.transporters.map(transporter => {
                                    return <option key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                })}
                            </Input>
                        </FormGroup>


                        <FormGroup>
                            <Button type="submit" className={'btn btn-primary'}>Create</Button>
                        </FormGroup>

                    </form>
                </Col>
            </Row>
        );
    }
}