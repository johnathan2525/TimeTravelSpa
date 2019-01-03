import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {
    GetAllPassengers,
    GetTransporter,
    GetTransporterPassengers,
    UpdatePassenger,
    UpdateTransporter
} from '../../api'
import './TransporterEdit.css'
import {transporterParse} from '../../functions'
import {Link} from 'react-router-dom'

export default class TransporterEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.removePassenger = this.removePassenger.bind(this);
        this.addPassenger = this.addPassenger.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.state = {
            id: this.props.match.params.id,
            transporter: {},
            passengers: [],
            passengersAll: [],
        };
    }


    async componentDidMount() {
        await this.loadTransporter()
        await this.loadTransporterPassengers()
        await this.loadAllPassengers()
    }

    renderLabel(passenger) {
        const transporter = transporterParse(passenger)
        if (transporter !== null) {
            return (
                <span className={'badge badge-secondary ml-2'}>{transporter.name}</span>
            )
        }
        return (<span/>)
    }
    
    
    async loadTransporter() {
        let transporter = await GetTransporter(this.state.id)

        if (transporter !== null) {
            this.setState({transporter: transporter})
        }
    }
    
    async loadTransporterPassengers() {
        let passengers = await GetTransporterPassengers(this.state.id)
        if (passengers !== null) {
            this.setState({passengers: passengers})
        }
    }
    
    async loadAllPassengers() {
        let passengersAll = await GetAllPassengers()
        if (passengersAll !== null) {
            this.setState({passengersAll: passengersAll})
        }
    }

    handleChanges(e) {
        let key = e.target.getAttribute('id')
        let transporterCopy = Object.assign({}, this.state.transporter);
        transporterCopy[`${key}`] = e.target.value;
        this.setState({transporter: transporterCopy});
    }
    
    async removePassenger(e) {
        e.preventDefault()
        const passengerIdToRemove =  parseInt(e.target.getAttribute('data-id'))
        let passengerSelected = this.state.passengersAll.filter(passenger => passenger.id === passengerIdToRemove)
        if (passengerSelected.length !== 1) {
            return
        }
        let passenger = passengerSelected[0]
        passenger.transporterId = null
        let passengerWithTransporterRemoved = UpdatePassenger(passenger.id, passenger)
        if (passengerWithTransporterRemoved === false) {
            return
        }
        
        await this.loadTransporter()
        await this.loadTransporterPassengers()
        await this.loadAllPassengers()
    }
    
    async addPassenger(e) {
        e.preventDefault();
        const passengerIdToAdd =  parseInt(e.target.getAttribute('data-id'))
        let passengerSelected = this.state.passengersAll.filter(passenger => passenger.id === passengerIdToAdd)
        if (passengerSelected.length !== 1) {
            return
        }
        let passenger = passengerSelected[0]
        passenger.transporterId = this.state.id
        let passengerWithTransporterAdded = UpdatePassenger(passenger.id, passenger)
        if (passengerWithTransporterAdded === false) {
            return
        }
        await this.loadTransporter()
        await this.loadTransporterPassengers()
    }
    

     async handleSubmit(event) {
        event.preventDefault();
        await UpdateTransporter(this.state.id, this.state.transporter)
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Transporter <em>{this.state.name}</em> - ID: {this.state.id}</h1>
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId={'name'}>
                            <Label for="name">Name</Label>
                            <Input id="name" type={'text'} minLength={5} value={this.state.transporter.name}
                                         onChange={this.handleChanges}/>
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" className={'btn btn-primary'}>Submit</Button>
                        </FormGroup>
                        
                        <h4>Remove Transporter Passengers</h4>
                        <ul>
                            {this.state.passengers.map((passenger, index) => {
                                return <li className={'mb-2'} key={index}>{passenger.name} <span className={'text-danger passenger-remove cursor-pointer'} data-id={passenger.id} onClick={this.removePassenger}>[x]</span></li>
                            })}
                        </ul>
                        
                        <hr />
                        
                        <h4>Add Other Passengers</h4>
                        <ul>
                            {this.state.passengersAll.map((passenger, index) => {
                                if(this.state.transporter.passengers.includes(passenger.id)) {
                                    return
                                }
                                console.log(passenger)
                                return <li className={'mb-2'} key={index}>{passenger.name}<span className={'text-success ml-1 passenger-add cursor-pointer'} data-id={passenger.id} onClick={this.addPassenger}>[+]</span>{this.renderLabel(passenger)}</li>
                            }, this)}
                        </ul>

                    </form>
                    
                </Col>
            </Row>
        );
    }
}