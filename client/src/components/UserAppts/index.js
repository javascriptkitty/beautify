import React from 'react';
import moment from 'moment';
import './style.css';

const UserAppts = props => {
    return (
        <div className="myAppt">
            <h2>My Appointments</h2>
            <br />
            {props.appointments.map(appt => {
                return (
                    <div key={appt.id}>
                        <h5>
                            <strong>{appt.service.name} </strong>
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

export default UserAppts;
