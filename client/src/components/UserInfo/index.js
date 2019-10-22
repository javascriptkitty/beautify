import React from 'react';
import moment from 'moment';

const UserInfo = props => {
    return (
        <div className="myInfo">
            <h2>{props.info.name}</h2>
            <br />
        </div>
    );
};

export default UserInfo;
