import React, { Component } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import AppContext from '../appContext.js';
import Popup from '../components/Popup';

import './usersProfile.css';
import Tabs from '../components/Tabs';

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

        return (
            <div>
                <Wrapper>
                    <Container>
                        <Tabs
                            userId={this.context.userId}
                            info={this.state.info}
                            appointments={this.state.appointments}
                            bookings={this.state.bookings}
                        />
                    </Container>
                </Wrapper>
            </div>
        );
    }
}

UserProfile.contextType = AppContext;
