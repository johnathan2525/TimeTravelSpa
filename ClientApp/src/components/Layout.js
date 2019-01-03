import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {NavMenu} from './NavMenu';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu/>
                <main id="main">
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                <ToastContainer autoClose={5000}/>
            </div>
        );
    }
}
