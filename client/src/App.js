import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from './components/Navbar';
import ServicesList from './components/ServicesList/services-list.component';
import CreateProvider from './components/CreateProvider/create-provider.component';
// import CreateService from './components/create-service.component';
import ProviderProfile from './pages/providerProfile';
import UserProfile from './pages/UserProfile';
import UserInfo from './components/UserInfo';
import UserAppts from './components/UserAppts';
import UserBookings from './components/UserBookings';
import UserServices from './components/UserServices';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import axios from 'axios';
import AppContext from './appContext';
import AnimatedBG from './components/Animated-bg';
import { withRouter } from 'react-router-dom';
import UserServ from './components/UserServices';

// const NavbarComp = (props) => {
//     const { location } = props;
//     if (location.pathname.match('/')){
//       return null;
//     }

class App extends React.Component {
    state = {
        userId: null,
        isLoggedIn: false,
        isProvider: false,
        setIsProvider: isProvider => {
            this.setState({ isProvider });
        },
        setproviderId: providerId => {
            // debugger;;
            this.setState({ providerId });
        }
    };

    componentDidMount() {
        axios.get('/auth/user').then(res => {
            console.log('AUTH/USER: ', res);

            const user = res.data.user ? res.data.user : {};

            this.setState({
                user,
                isLoggedIn: res.data.loggedIn,
                isProvider: user.isProvider,
                userId: user.id
            });
        });
    }

    logout = () => {
        axios.get('/auth/logout').then(res => (window.location.href = '/'));
    };

    render() {
        // debugger;;
        const showNav = window.location.pathname != '/';
        console.log(this.state);
        return (
            <AppContext.Provider value={this.state}>
                <Router>
                    {!this.state.isLoggedIn ? (
                        <div>
                            <LogIn />
                            <SignUp />
                        </div>
                    ) : (
                        <div>
                            <Route path="/" component={NavbarComp} />
                            <Route
                                path="/"
                                exact
                                component={() => (
                                    <AnimatedBG
                                        userId={this.state.user.id}
                                        isProvider={this.state.user.isProvider}
                                        logout={this.logout}
                                    />
                                )}
                            />
                            <Route path="/services" component={ServicesList} />
                            <Route path="/providers/new" component={CreateProvider} />
                            <Route
                                path="/providers/id/:id/service/:service"
                                component={ProviderProfile}
                            />
                            {/* <Route path="/provider/:id/edit" component={EditeProfile} /> */}
                            <Route path="/user/id/:id/profile" exact component={UserProfile} />
                            <Route path="/user/id/:id/profile/info" component={UserInfo} />
                            <Route path="/user/id/:id/profile/services" component={UserServices} />
                            <Route
                                path="/user/id/:id/profile/appointments"
                                render={props => <UserProfile {...props} tab="appointments" />}
                            />
                            <Route
                                path="/user/id/:id/profile/bookings"
                                render={props => <UserProfile {...props} tab="bookings" />}
                            />
                        </div>
                    )}
                </Router>
            </AppContext.Provider>
        );
    }
}

export default App;
