import React, { Component } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import Hero from '../components/Hero';
import AppContext from '../appContext.js';
import Popup from '../components/Popup';
import UserServ from '../components/UserServices';
import NavComp from '../components/Nav';
import UserAppts from '../components/UserAppts';
import UserBookings from '../components/UserBookings';
import UserInfo from '../components/UserInfo';
import './usersProfile.css';
import moment from 'moment';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            info: {},
            appts: [],
            bookings: [],
            appointments: [],
            userId: this.props.match.params.id,
            isCreated: false,
            isHidden: true
        };
    }

    handleClick() {
        this.setState({
            isHidden: false,
            isCreated: true
        });
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            isCreated: false
        });
    }

    loadBookedServices = userId => {
        return axios
            .get(`/api/user/${userId}/appointments`)
            .then(res => {
                debugger;
                this.setState({
                    appointments: res.data
                });
            })
            .catch(err => console.log(err));
    };

    loadBookings = providerId => {
        return axios
            .get(`/api/providers/${providerId}/appointments`)
            .then(res => {
                debugger;
                this.setState({
                    bookings: res.data
                });
            })
            .catch(err => console.log(err));
    };

    getProvidersInfo = id => {
        const providerUrl = `/api/providers/${id}`;

        axios.get(providerUrl).then(res => {
            this.setState({
                info: res.data[0]
            });
        });
    };

    componentDidMount() {
        this.loadBookedServices(this.props.match.params.id);
        this.loadBookings(this.context.user.providerId);
        this.getProvidersInfo(this.context.user.providerId);
    }

    render() {
        console.log(this.state.appointments);
        console.log(this.context.user.providerId);
        console.log(this.state.bookings);
        console.log(this.state.info);

        let appointmentsComponent;
        let bookingsComponent;
        let servicesComponent;
        // if (this.props.tab === 'appointments') {
        appointmentsComponent = <UserAppts appointments={this.state.appointments} />;
        //        } else if (this.props.tab === 'bookings') {
        bookingsComponent = <UserBookings bookings={this.state.bookings} />;
        //        } else if (this.props.tab === 'services') {
        servicesComponent = (
            <div className="myServ">
                <UserServ services={this.state.info.services} />

                <Popup buttonLabel="Add a service" />
            </div>
        );
        //    }

        return (
            <div>
                <Wrapper>
                    <Container>
                        <NavComp userId={this.context.userId} />

                        <UserInfo info={this.state.info} />
                        {appointmentsComponent}
                        {bookingsComponent}
                        {servicesComponent}
                        <br />
                    </Container>
                </Wrapper>
            </div>
        );
    }
}

UserProfile.contextType = AppContext;
