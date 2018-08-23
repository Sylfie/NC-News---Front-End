import React, { Component } from 'react';
import './LogIn.css'

class LogIn extends Component {
    state = {
        input: ''
    }
    render() {
        return (
            <form className="log-in">
                <input type="text" />
                <br />
                <br />
                <button>Log In</button>
                <button>Sign Up</button>
            </form>
        );
    }
}

export default LogIn;