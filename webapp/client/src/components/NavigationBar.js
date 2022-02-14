import './NavigationBar.css'
import React, {Component, components} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, Navbar} from 'react-bootstrap'

class NavigationBar extends Component{
    render(){
        return(
            <div>
                <Navbar bg="darkgrey" variant='dark' sticky='top' expand='lg' collapseOnSelect>
                    <Navbar.Brand className='ms-3'>
                        <a className='logo' href='/'>Edge partitioning</a>
                    </Navbar.Brand>
                <Navbar.Toggle className='me-2'/>
                <Navbar.Collapse>
                    <Nav className="ms-auto me-3">
                        <Nav.Link className='ms-3' href='learn'>Learn</Nav.Link>
                        <Nav.Link className='ms-3' href='support'>Support</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                    
                </Navbar>
            </div>
        )   
    };
}

export default NavigationBar;