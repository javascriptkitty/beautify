import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import Container from '../Container';
import Wrapper from '../Wrapper';
import ProviderCard from '../ProviderCard';
import IconCard from '../Icons';
import Slider from '../Slider';
import AppContext from '../../appContext';
import ScrollIntoView from 'react-scroll-into-view';

export default class ServicesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            service: [],
            services: [],
            providers: []
        };
    }

    findServicesForCategory = category => {
        debugger;
        return axios
            .get(`/api/services/category/${category}`)
            .then(res => {
                this.setState({
                    services: res.data
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Slider />
                <Wrapper>
                    <main>
                        <ScrollIntoView selector="#scrollTarget">
                            <IconCard findServicesForCategory={this.findServicesForCategory} />
                        </ScrollIntoView>
                        <Container id="scrollTarget">
                            <hr />
                            <br />
                            {this.state.services.map(service => {
                                const provider = service.providers[0];
                                return (
                                    <ProviderCard
                                        key={provider.id}
                                        id={provider.id}
                                        name={provider.name}
                                        service={service}
                                    />
                                );
                            })}
                        </Container>
                    </main>
                </Wrapper>
            </div>
        );
    }
}

ServicesList.contextType = AppContext;
