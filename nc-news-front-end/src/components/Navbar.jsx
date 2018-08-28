import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogIn from './LogIn';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav className="nav">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">Northcoders News </a>
                        <a data-target="menu" className="sidenav-trigger show-on-large">
                            <i className="fa fa-bars"></i>
                        </a>
                        <ul className="right hide-on-small-only">
                            <li><NavLink to="/topics" activeClassName="selected">Topics</NavLink></li>
                            <li><NavLink to="/articles" activeClassName="selected">Articles</NavLink></li>
                        </ul>
                        <ul className="sidenav" id="menu">
                            <li><LogIn activeUser={this.props.activeUser} /></li>
                            <li><NavLink to="/topics" activeClassName="selected">Topics</NavLink></li>
                            <li><NavLink to="/articles" activeClassName="selected">Articles</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

LogIn.propTypes = {
    activeUser: PropTypes.string.isRequired
};

export default Navbar;