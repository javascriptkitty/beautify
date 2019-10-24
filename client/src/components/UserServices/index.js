import React from 'react';
import { CardBody, Card } from 'reactstrap';
import './style.css';

const UserServ = props => {
    const services = props.services
        ? props.services.map(service => {
              return (
                  <Card>
                      <CardBody>
                          <div className="myService" key={service.id}>
                              <div className="myServiceInfo">
                                  <h4>
                                      <strong>{service.name}</strong>
                                  </h4>
                                  <p>
                                      <strong>Description: </strong>
                                      {service.description}
                                  </p>
                                  <p>
                                      <strong>Duration: </strong>
                                      {service.duration} min
                                  </p>
                                  <p>
                                      <strong>Price: </strong>
                                      {service.price}$
                                  </p>
                              </div>
                              <div className="myServiceButtons">
                                  <a
                                      className="btn"
                                      style={{ color: 'white', background: '#07ddbd' }}
                                  >
                                      Modify
                                  </a>{' '}
                                  <a
                                      className="btn"
                                      style={{ color: 'white', background: 'rgb(142, 120, 174)' }}
                                  >
                                      Delete
                                  </a>
                              </div>
                          </div>
                      </CardBody>
                  </Card>
              );
          })
        : 'Loading ...';

    return (
        <div>
            <br />

            {services}
        </div>
    );
};

export default UserServ;
