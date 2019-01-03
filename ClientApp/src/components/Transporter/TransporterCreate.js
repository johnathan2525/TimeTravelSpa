import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {CreateTransporter} from '../../api'

export default class TransporterCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.state = {
            transporter: {
                name: '',
            },
        };
    }

    handleChanges(e) {
        let key = e.target.getAttribute('id')
        let transporterCopy = Object.assign({}, this.state.transporter);
        transporterCopy[`${key}`] = e.target.value;
        this.setState({transporter: transporterCopy});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let transporter = await CreateTransporter(this.state.transporter)
        if (transporter !== false) {
            this.props.history.push(`/transporters/${transporter.id}`)
        }
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Add Transporter</h1>
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup>
                            <Label for={'name'}>Name</Label>
                            <Input id={'name'} type={'text'} minLength={5} value={this.state.transporter.name} onChange={this.handleChanges} />
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