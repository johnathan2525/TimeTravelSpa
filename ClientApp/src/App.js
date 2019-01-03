import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './scss/app.scss';
import './app.css';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import PassengerIndex from './components/Passenger/PassengerIndex'
import PassengerSingle from './components/Passenger/PassengerSingle'
import PassengerEdit from './components/Passenger/PassengerEdit'
import TransporterIndex from './components/Transporter/TransporterIndex'
import TransporterSingle from './components/Transporter/TransporterSingle'
import TransporterEdit from './components/Transporter/TransporterEdit'
import PassengerCreate from './components/Passenger/PassengerCreate'
import TransporterCreate from './components/Transporter/TransporterCreate'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route exact path='/passengers-create' component={PassengerCreate}/>
                <Route exact path='/passengers' component={PassengerIndex}/>
                <Route exact path='/passengers/:id/edit' component={PassengerEdit}/>
                <Route exact path='/passengers/:id' component={PassengerSingle}/>
                <Route exact path='/transporters-create' component={TransporterCreate}/>
                <Route exact path="/transporters" component={TransporterIndex}/>
                <Route exact path="/transporters/:id/edit" component={TransporterEdit}/>
                <Route exact path="/transporters/:id" component={TransporterSingle}/>
            </Layout>
        );
    }
}
