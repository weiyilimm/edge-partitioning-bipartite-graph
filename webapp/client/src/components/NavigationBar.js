import './NavigationBar.css'
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Nav, Navbar} from 'react-bootstrap'

class NavigationBar extends Component{
    render(){
        return(
            <div>
                <Navbar bg="darkgrey" variant='dark' sticky='top' expand='lg' collapseOnSelect>
                    <Navbar.Brand className='ms-3'>
                        <img src="/BipartiteLogoWhite.png" alt="Bipartite Logo" className='icon' href='/'></img>
                        <a className='logo' href='/'>Edge partitioning</a>
                    </Navbar.Brand>
                <Navbar.Toggle className='me-2'/>
                <Navbar.Collapse>
                    <Nav className="ms-auto me-3">
                        <Nav.Link className='ms-3' href='/graph-initialisation'>Learn</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                    
                </Navbar>
            </div>
        )   
    };
}

export default NavigationBar;