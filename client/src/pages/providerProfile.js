import React, { Component } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import Hero from '../components/Hero';
import 'rc-time-picker/assets/index.css';
import ServiceCard from '../components/ServiceCard';
import DatePicker from 'react-datepicker';
import './providerProfile.css';
import { Link } from 'react-router-dom';
import { Hub } from '@babel/traverse';
import ScrollIntoView from 'react-scroll-into-view';
import AppContext from '../appContext';
import moment from 'moment';

export default class ProviderProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            img: '',
            bio: '',
            services: [],
            monthSlots: [],
            daySlots: [],
            selectedMonth: moment().format('YYYY-MM'),
            selectedDate: null,
            selectedTime: null,
            selectedSlot: '',
            providerId: this.props.match.params.id,
            userId: 1,
            selectedServiceId: this.props.match.params.service,
            serviceDuration: 30,
            showConfirm: false,
            isBooked: false,
            servSnown: false
        };
    }

    handleClick = () => {
        this.setState({
            servSnown: !this.state.servSnown
        });
    };

    showApptInfo = () => {
        this.setState({
            isBooked: false,
            showConfirm: false
        });
    };
    onSelectTime(time) {
        this.setState({ selectedTime: time });
    }

    onMonthChange = selectedMonth => {
        const monthFormated = moment(selectedMonth).format('YYYY-MM');
        this.setState({ selectedMonth: monthFormated });
        this.getSlotsForMonth(monthFormated);
    };
    onSelectDate = selectedDate => {
        this.setState({ selectedDate });
        this.getSlotsForDay(selectedDate);
        this.setState({ showConfirm: true });
    };

    getSlotsForMonth(month) {
        const monthSlotsUrl = `/api/providers/${this.state.providerId}/slots/month/${month}?serviceId=${this.state.selectedServiceId}`;
        axios.get(monthSlotsUrl).then(res => {
            const monthSlots = res.data.map(slot => new Date(slot));
            this.setState({ monthSlots });
        });
    }

    getSlotsForDay(day) {
        const dayStr = moment(day).format('YYYY-MM-DD');
        const daySlotsUrl = `/api/providers/${this.state.providerId}/slots/day/${dayStr}?serviceId=${this.state.selectedServiceId}`;

        axios.get(daySlotsUrl).then(res => {
            this.setState({ daySlots: res.data });
        });
    }

    bookAppointment = () => {
        const service = this.state.services.find(
            service => service.id + '' === this.state.selectedServiceId
        );
        const startTime =
            this.state.selectedDate.toISOString().split('T')[0] + ' ' + this.state.selectedTime;
        const endTime = moment(startTime)
            .add(service.duration, 'minute')
            .format();

        const userId = this.context.user.id;
        
        const appt = {
            start_time: moment(startTime).format(),
            end_time: endTime,
            providerId: this.state.providerId,
            userId,
            serviceId: this.state.selectedServiceId
        };
        console.log(appt);
        axios.post('/api/appointments', appt).then(res => console.log(res.data));
        this.setState({
            showConfirm: false,
            selectedDate: null,
            selectedTime: null,
            selectedSlot: '',
            isBooked: true
        });
    };

    componentDidMount() {
        this.getProvidersInfo(this.props.match.params.id);
        this.getSlotsForMonth(this.state.selectedMonth);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedServiceId: nextProps.match.params.service
        });
        this.getProvidersInfo(nextProps.match.params.id);

        this.getSlotsForMonth(this.state.selectedMonth);
    }

    getProvidersInfo = id => {
        const providerUrl = `/api/providers/${id}`;
        axios.get(providerUrl).then(res => {
            this.setState({
                name: res.data[0].name,
                img: res.data[0].img,
                bio: res.data[0].bio,
                services: res.data[0].services
            });
        });
    };

    displayServiceName() {
        const service = this.state.services.find(
            service => service.id + '' === this.state.selectedServiceId
        );
        return service == null ? null : service.name;
    }
    displayServicePrice() {
        const service = this.state.services.find(
            service => service.id + '' === this.state.selectedServiceId
        );
        return service == null ? null : service.price;
    }
    displayServiceDuration() {
        const service = this.state.services.find(
            service => service.id + '' === this.state.selectedServiceId
        );
        return this.setState({
            serviceDuration: service == null ? '' : service.duration
        });
    }

    formatSelectedDate() {
        return this.state.selectedDate
            ? this.state.selectedDate.toISOString().split('T')[0] + ''
            : null;
    }
    render() {
        return (
            <div>
                <Wrapper>
                    <Hero backgroundImage="https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                        <h1>Beautify</h1>
                    </Hero>
                    <div className="freelancer-content">
                        <Container>
                            <br />
                            <br />
                            <h1>Provider: {this.state.name}</h1>
                            <hr />
                            <h4>About: </h4>
                            <p> {this.state.bio} </p>

                            <section id="scrollApptInfo">
                                <div className="dayPick">
                                    <h4>Choose a Date: </h4>

                                    <DatePicker
                                        inline
                                        selected={this.state.selectedDate}
                                        onChange={this.onSelectDate}
                                        onMonthChange={this.onMonthChange}
                                        isOpen={true}
                                        minDate={moment().toDate()}
                                        includeDates={this.state.monthSlots}
                                        forceShowMonthNavigation={true}
                                    />
                                </div>

                                {!this.state.isBooked ? (
                                    <div className="apptInfo">
                                        <br />
                                        <div className="info">
                                            <h2>
                                                {this.displayServiceName()} with {this.state.name}{' '}
                                            </h2>

                                            <p>
                                                <strong>Day: </strong>
                                                {this.state.selectedDate == null
                                                    ? ''
                                                    : moment(
                                                          this.formatSelectedDate(),
                                                          'YYYY-MM-DD'
                                                      ).format('dddd MMMM Do')}{' '}
                                            </p>
                                            <p>
                                                <strong>Time: </strong>
                                                {this.state.selectedTime}
                                            </p>
                                            <p>
                                                <strong>Price: </strong>
                                                {this.displayServicePrice()}$
                                            </p>

                                            {this.state.showConfirm ? (
                                                <div className="time">
                                                    {this.state.daySlots.map(slot => {
                                                        var slotStart = slot.substr(11, 5);
                                                        return (
                                                            <a
                                                                className="btn"
                                                                onClick={this.onSelectTime.bind(
                                                                    this,
                                                                    slotStart
                                                                )}
                                                            >
                                                                {slotStart}
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            ) : null}
                                        </div>

                                        {this.state.showConfirm ? (
                                            <button
                                                className="confirmBtn"
                                                onClick={this.bookAppointment}
                                            >
                                                Confirm
                                            </button>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div>
                                        {' '}
                                        <p>Booked!</p>{' '}
                                        <Link to="/services" className="btn">
                                            Back to search?
                                        </Link>{' '}
                                    </div>
                                )}
                            </section>

                            <br />
                            <br />

                            {this.state.servSnown ? (
                                <div>
                                    <h1> All Services</h1>

                                    {this.state.services.map(service => {
                                        const url = `/providers/id/${this.state.providerId}/service/${service.id}`;
                                        // debugger;;
                                        return (
                                            <div className="allServices" key={service.name}>
                                                <ServiceCard
                                                    name={service.name}
                                                    description={service.description}
                                                    duration={service.duration}
                                                    price={service.price}
                                                />
                                                <div className="bookBtn">
                                                    <ScrollIntoView selector="#scrollApptInfo">
                                                        <Link
                                                            to={url}
                                                            className="btn"
                                                            onClick={this.showApptInfo}
                                                        >
                                                            {' '}
                                                            Book!{' '}
                                                        </Link>
                                                    </ScrollIntoView>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div>
                                    <a className="btn" onClick={this.handleClick}>
                                        View all services
                                    </a>
                                </div>
                            )}
                        </Container>
                    </div>
                </Wrapper>
            </div>
        );
    }
}

ProviderProfile.contextType = AppContext;
