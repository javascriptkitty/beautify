import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './style.css';

const HiddenDiv = props => {
    const [collapse, setCollapse] = useState(false);

    const toggle = () => setCollapse(!collapse);

    const services = props.services
        ? props.services.map(service => {
              return (
                  <Card>
                      <CardBody>
                          <div className="myService" key={service.id}>
                              <div className="myServiceInfo">
                                  <h5>{service.name}</h5>
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
            <a className="primaryBtn" onClick={toggle} style={{ marginBottom: '1rem' }}>
                <h4>My services </h4> <span>▼</span>
            </a>
            <Collapse isOpen={collapse}>{services}</Collapse>
        </div>
    );
};

export default HiddenDiv;
