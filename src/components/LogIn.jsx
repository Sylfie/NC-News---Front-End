import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogIn.css';

class LogIn extends Component {
    state = {
        input: '',
        loggedIn: false
    }
    render() {
        return (
            <div className="log-in">
                {!this.state.loggedIn ? <form>
                    <input type="text" />
                    <br />
                    <br />
                    <button className="btn">Log In</button>
                    <button className="btn">Sign Up</button>
                </form> : <div>
                        <p>Hi, jessjelly!</p>
                        <img src="https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg" alt="jessjelly's avatar" />
                        <br />
                        <button className="btn" onClick={() => this.logout}>Logout</button>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.checkUser(this.props.activeUser)
    }

    checkUser = (user) => {
        if (user) {
            this.setState({
                loggedIn: true
            })
        }
    }

    logout = (user) => {
        if (user) {
            this.setState({
                loggedIn: true
            })
        }
    }
}

LogIn.propTypes = {
    activeUser: PropTypes.string.isRequired
};

export default LogIn;