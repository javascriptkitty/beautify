import React, { useState } from 'react';
import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';
import AppContext from '../../appContext';

const NavComp = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const userProfileAppt = `/user/id/${props.userId}/profile/appointments`;

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink href="#" active>
                        Info
                    </NavLink>
                </NavItem>
                <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle nav caret>
                        Upcoming appointments
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link to={userProfileAppt}>My appointments</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link to="#">Bookings with me</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavItem>
                    <NavLink href="#">My services</NavLink>
                </NavItem>
            </Nav>
        </div>
    );
};

export default NavComp;

NavComp.contextType = AppContext;
