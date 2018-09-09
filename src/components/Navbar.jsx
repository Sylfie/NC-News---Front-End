import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogIn from './LogIn';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav className="nav">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo center">Northcoders News </Link>
                        <Link to="#" data-target="menu" className="sidenav-trigger show-on-large">
                            <i className="fa fa-bars"></i>
                        </Link>
                        <ul className="right hide-on-small-only">
                            <li><Link to="/topics" className="selected">Topics</Link></li>
                            <li><Link to="/articles" className="selected">Articles</Link></li>
                        </ul>
                        <ul className="sidenav" id="menu">
                            <li><LogIn activeUser={this.props.activeUser} /></li>
                            <li><Link to="/topics" className="selected">Topics</Link></li>
                            <li><Link to="/articles" className="selected">Articles</Link></li>
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