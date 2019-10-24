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
    const userProfileBookings = `/user/id/${props.userId}/profile/bookings`;
    const userProfileServices = `/user/id/${props.userId}/profile/services`;
    const userProfileInfo = `/user/id/${props.userId}/profile`;

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink href={userProfileInfo} active>
                        Info
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={userProfileServices}>My Services</NavLink>
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
                            <Link to={userProfileBookings}>Bookings with me</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
        </div>
    );
};

export default NavComp;

NavComp.contextType = AppContext;
