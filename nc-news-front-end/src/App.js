//packages
import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
//styles & extra js
import './App.css';
//components
import Article from './components/Article';
import Topics from './components/Topics';
import LogIn from './components/LogIn';
import Articles from './components/Articles';
import Error from './components/Error';
import User from './components/User';


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
          <Route exact path="/error" component={Error} />
          <Route path="/articles/:article_id" render={(props) => <Article {...props} activeUser={this.state.activeUser} />} />
          <Route path="/topics/:topic_slug/articles" component={Articles} />
          <Route path="/users/:username" component={User} />
          <Route exact path="/error" component={Error} />
          {/* <Route path="/*" component={Error} /> */}


        </main>
      </div>
    );
  }
  componentDidMount = () => {
    console.log('App js angry birds')
  };


}


export default App;
