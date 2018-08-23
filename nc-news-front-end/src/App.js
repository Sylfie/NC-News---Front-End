//packages
import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
//styles & extra js
import * as api from './api';
import './App.css';
//components
import Article from './components/Article';
import Topics from './components/Topics';
import Comments from './components/Comments';
import LogIn from './components/LogIn';
import Articles from './components/Articles';


class App extends Component {
  state = {
    activeUser: "5b64816a0318403e159e7dbd"
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LogIn />
          <nav>
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
        <main>
          <h1 className="App-title">Welcome to NC News</h1>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/articles" component={Articles} />
          <Route path="/articles/:article_id" component={Article} />
          {/* <Route path="/articles/:article_id" component={Comments} /> */}
          <Route path="/topics/:topic_slug/articles" component={Articles} />
        </main>
      </div>
    );
  }
  componentDidMount = () => {
    console.log('angry birds')
  };
}


export default App;
