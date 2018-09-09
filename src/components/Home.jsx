import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1>Welcome to NC News</h1>
                <h3>Want to know what's going on? Have a browse in our topics or articles!</h3>
                <Link to="/topics"><div className="home-item"><p>Topics</p></div></Link>
                <Link to="/articles"><div className="home-item"><p>Articles</p></div></Link>
            </div>
        );
    }
}

export default Home;