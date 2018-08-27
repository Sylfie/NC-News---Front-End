import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LogIn from './LogIn';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <LogIn />
                <nav className="nav">
                    <NavLink to="/" activeClassName="selected">Home</NavLink>
                    <br />
                    <br />
                    <br />
                    <NavLink to="/topics" activeClassName="selected">Topics</NavLink>
                    <br />
                    <br />
                    <br />
                    <NavLink to="/articles" activeClassName="selected">Articles</NavLink>
                </nav>
            </header>
        );
    }
}

export default Header;