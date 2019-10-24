import React from 'react';
import moment from 'moment';
//import './style.css';

const UserBookings = props => {
    if (!props.bookings) {
        return null;
    }
    return (
        <div className="myBookings">
            <h2>Bookings with me</h2>
            <br />
            {props.bookings.map(appt => {
                return (
                    <div key={appt.id}>
                        <h5>
                            <strong>{appt.service.name}</strong>
                        </h5>
                        <p>
                            {' '}
                            {moment(appt.start_time).format('Do MMMM')} at{' '}
                            {moment(appt.start_time).format('hh:mm a')}
                        </p>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};

export default UserBookings;
