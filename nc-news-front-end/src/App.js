//packages
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//styles & extra js
import './App.css';
//components
import Navbar from './components/Navbar';
import Article from './components/Article';
import Topics from './components/Topics';
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
          <Navbar />
        </header>
        <main className="main-container">
          {/* <h1 className="App-title">Northcoders News Messenger</h1> */}
          <Route exact path="/" render={() => <div className="home"><h1>Welcome to NC News!</h1><h3>Want to know what's going on? Have a browse in our topics or articles :)</h3></div>} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/error" component={Error} />
          <Route path="/articles/:article_id" render={(props) => <Article {...props} activeUser={this.state.activeUser} />} />
          <Route path="/topics/:topic_slug/articles" component={Articles} />
          <Route path="/users/:username" component={User} />
          <Route exact path="/error" component={Error} />
        </main>
      </div>
    );
  }
  componentDidMount = () => {
    console.log('App js angry birds')
  };


}


export default App;
