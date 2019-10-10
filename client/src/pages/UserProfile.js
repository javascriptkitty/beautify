import React, { Component } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import Hero from '../components/Hero';
import AppContext from '../appContext.js';
import CreateServices from '../components/Create-services';
import { Link } from 'react-router-dom';
import './usersProfile.css';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            appts: [],
            booked: [],
        
            userId: this.props.match.params.id,
            isCreated: false,
            isHidden: true
        };
    }

    handleClick() {
        this.setState({
            isHidden: false,
            isCreated: true
        });
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }

    loadBookedServices= userId=> {
      return axios
        .get(`/api/user/${userId}/appointments`)
        .then(res => {
          const booked = res.data;

          this.setState(
            {
              booked
            },
            console.log(res.data)
          );
        })
        .catch(err => console.log(err));
    };

    componentDidMount() {
        this.loadBookedServices(this.props.match.params.id);
      
    }

    render() {
        // debugger;;
        return (
            <div>
                <Wrapper>
                    
                    <Container>
                    <h1>Upcoming appointments</h1>
                     <div className='allEvents'>
                     
                     <div className='myBooked'><h2>Booked services</h2> 
                      {this.state.booked.map(service => {
                          return(
                              <div>
                              /////
                              </div>
                          )
                      })}
                     
                     </div>
                     <div className='myUpcoming'><h2>My services</h2> </div>
                     </div>
                        
                        {/* <div>
                    
                       {this.state.isHidden||this.state.isCreated  ?
                       
                      <button className="btn" onClick={this.toggleHidden.bind(this)}>Add a service </button>
                      : null}
                        {!this.state.isHidden &&  <CreateServices providerId={this.context.providerId} isCreated={this.state.isCreated} handleClick={this.handleClick}/>}
                      
                  </div> */}

                        {this.state.isCreated ? (
                            <div>
                                <h2>created!</h2> <br /> <br />
                            </div>
                        ) : null}
                        {!this.state.isHidden ? (
                            <div>
                                <Link to="/services" className="btn">
                                    Back to main{' '}
                                </Link>
                            </div>
                        ) : (
                            <CreateServices
                                providerId={this.context.providerId}
                                isHidden={this.state.isHidden}
                                handleClick={this.handleClick}
                            />
                        )}


                    </Container>
                </Wrapper>
            </div>
        );
    }
}

UserProfile.contextType = AppContext;
