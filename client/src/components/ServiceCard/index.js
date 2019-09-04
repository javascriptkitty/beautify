import React from 'react';
import './style.css';

function ServiceCard(props) {
    return (
        <div className="serviceDiv">
            <h4>{props.name}</h4>

            <p> {props.description} </p>
            <p>
                <strong>Duration:</strong>
                {props.duration} min{' '}
            </p>
            <p>
                <strong>Price: </strong>
                {props.price} ${' '}
            </p>
        </div>
    );
}

export default ServiceCard;
