import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import Container from '../Container';
import Row from '../Row';
import './style.css';
import yoga2 from '../../assets/img/yoga2.png';
import workout from '../../assets/img/workout.png';
import nutritionist from '../../assets/img/nutritionist.png';
import nails from '../../assets/img/nails.png';
import fashion from '../../assets/img/fashion.png';
import massage from '../../assets/img/massage.png';
import lipstick2 from '../../assets/img/lipstick2.png';
import blowdry from '../../assets/img/blowdry.png';

const icons = [
    { name: 'MakeUp', id: 'make-up', src: lipstick2, alt: 'Card image MakeUp' },
    { name: 'Hair/Barber', id: 'hair-barber', src: blowdry, alt: 'Card image Hair/barber' },
    { name: 'Yoga', id: 'yoga', src: yoga2, alt: 'Card image Yoga' },
    { name: 'Fitness', id: 'fitness', src: workout, alt: 'Card image Fitness' },
    { name: 'Nutritionist', id: 'nutritionist', src: nutritionist, alt: 'Card image Nutritionist' },
    { name: 'Fashion', id: 'fashion', src: fashion, alt: 'Card image Fashion' },
    { name: 'Massage', id: 'massage', src: massage, alt: 'Card image Massage' },
    { name: 'Nails', id: 'nails', src: nails, alt: 'Card image Nails' }
];

const IconCard = props => {
    const id = 'fitness';
    return (
        <div className="services-content">
            <Container>
                <br />
                <Row>
                    {icons.map(icon => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-3" key={icon.id}>
                                <Card>
                                    <CardImg
                                        top
                                        width="100%"
                                        height="100%"
                                        src={icon.src}
                                        alt={icon.alt}
                                    />
                                    <CardBody>
                                        <CardTitle>
                                            <h2 className="title">
                                                <strong>{icon.name}</strong>
                                            </h2>
                                        </CardTitle>

                                        <Button
                                            onClick={() => props.findServicesForCategory(icon.id)}
                                        >
                                            BROWSE
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })}

                    <br />
                    <br />
                </Row>
            </Container>
        </div>
    );
};

export default IconCard;
