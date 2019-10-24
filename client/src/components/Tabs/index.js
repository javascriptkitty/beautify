import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import UserAppts from '../UserAppts';
import UserBookings from '../UserBookings';
import UserInfo from '../UserInfo';
import UserServ from '../UserServices';
import './style.css';

const Tabs = props => {
    const [activeTab, setActiveTab] = useState('3');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className="tabDiv">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        Info
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        My services
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => {
                            toggle('3');
                        }}
                    >
                        Upcoming events
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <UserInfo info={props.info} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <UserServ services={props.info.services} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="6">
                            <UserBookings bookings={props.bookings} />
                        </Col>
                        <Col sm="6">
                            <UserAppts appointments={props.appointments} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default Tabs;
