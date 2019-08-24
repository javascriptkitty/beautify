import './style.css';
import logo from '../../assets/img/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    //   UncontrolledDropdown,
    //   DropdownToggle,
    //   DropdownMenu,
    //   DropdownItem
} from 'reactstrap';

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

        return (
            <div>
                <Navbar color="teal" light expand="md">
                    <NavbarBrand>
                        <img src={logo} />
                        <Link to="/"> beautify</Link>
                    </NavbarBrand>
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

                            {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

NavbarComp.contextType = AppContext;
