import React from 'react';
import moment from 'moment';

const UserInfo = props => {
    return (
        <div className="profileTab">
            <div className="infoName">
                {' '}
                <h1>{props.info.name}</h1>
                <p className="editIcon">&#9998;</p>
            </div>

            <br />
            <h2>Bio</h2>
            <p>{props.info.bio}</p>
            <h2>Working hours:</h2>
            <p>{props.info.workingHours}</p>
        </div>
    );
};

export default UserInfo;
