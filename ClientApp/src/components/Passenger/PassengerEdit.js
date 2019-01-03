import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {GetAllTransporters, GetPassenger, UpdatePassenger} from '../../api'

export default class PassengerEdit extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.state = {
            id: this.props.match.params.id,
            passenger: {},
            transporters: [],
        };
    }

    async componentDidMount() {
        let passenger = await GetPassenger(this.state.id);
        if (passenger !== false) {
            passenger.positionInTime = new Date(passenger.positionInTime).toISOString().substr(0, 10)
            delete passenger['transporter']
            this.setState({passenger: passenger})
        }
        let transporters = await GetAllTransporters();
        if (transporters !== false) {
            this.setState({transporters: transporters})
        }
        
    }

    handleChanges(e) {
        let key = e.target.getAttribute('id')
        let passengerCopy = Object.assign({}, this.state.passenger);
        passengerCopy[`${key}`] = e.target.value;
        this.setState({passenger: passengerCopy});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await UpdatePassenger(this.state.id, this.state.passenger)
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Passenger <em>{this.state.name}</em> - ID: {this.state.id}</h1>
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
                                <option value={null}></option>
                                {this.state.transporters.map(transporter => {
                                    return <option key={transporter.id} value={transporter.id}>{transporter.name}</option>
                                })}
                            </Input>
                        </FormGroup>


                        <FormGroup>
                            <Button type="submit" className={'btn btn-primary'}>Submit</Button>
                        </FormGroup>

                    </form>
                </Col>
            </Row>
        );
    }
}