import './style.css';
import logo from '../../assets/img/logo_xs.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import AppContext from '../../appContext';

export default class NavbarComp extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        if (window.location.pathname == '/') {
            return null;
        }

        const myProfileLink = `/user/id/${this.context.userId}/profile`;

        return (
            <div>
                <Navbar color="teal" light expand="md">
                    {/* <NavbarBrand > */}
                    <img src={logo} />
                    <Link to="/">
                        {' '}
                        <h1 className="navLogo">beautify</h1>
                    </Link>
                    {/* </NavbarBrand> */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link to="/services/">Services</Link>
                            </NavItem>
                            {!this.context.isProvider ? (
                                <NavItem>
                                    <Link to="/providers/new">Become A Provider </Link>
                                </NavItem>
                            ) : (
                                <NavItem>
                                    <Link to="/user/profile">Create service</Link>
                                </NavItem>
                            )}
                            <NavItem>
                                    <Link to={myProfileLink}>My profile</Link>
                                </NavItem>
                            
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

NavbarComp.contextType = AppContext;
