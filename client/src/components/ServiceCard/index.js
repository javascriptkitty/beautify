import React from 'react';
import './style.css';

const ServiceCard = props => {
    return (
        <div className="serviceDiv">
            <h5>{props.name}</h5>

            <p> {props.description} </p>
            <p>
                <strong>Duration: </strong>
                {props.duration} min{' '}
            </p>
            <p>
                <strong>Price: </strong>
                {props.price} ${' '}
            </p>
        </div>
    );
};

export default ServiceCard;
