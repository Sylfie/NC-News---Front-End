//packages
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//styles & extra js
import './App.css';
//components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Article from './components/Article';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Errors from './components/Errors';
import User from './components/User';


class App extends Component {
  state = {
    activeUser: "5b64816a0318403e159e7dbd"
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar activeUser={this.state.activeUser} />
        </header>
        <main className="main-container">
          <Route exact path="/" component={Home} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/articles" component={Articles} />
          <Route path="/articles/:article_id" render={(props) => <Article {...props} activeUser={this.state.activeUser} />} />
          <Route path="/topics/:topic_slug/articles" component={Articles} />
          <Route path="/users/:username" component={User} />
          <Route exact path="/error" component={Errors} />
          {/* <Route path="/*" component={Errors} /> */}
        </main>
      </div>
    )
  };
}

export default App;
