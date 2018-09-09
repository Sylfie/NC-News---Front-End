import React, { Component } from 'react';
import LogIn from './LogIn';
import Navbar from './Navbar';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <LogIn />
                <Navbar />
            </header>
        );
    }
}

export default Header;