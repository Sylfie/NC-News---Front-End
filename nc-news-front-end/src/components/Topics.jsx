import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../api';
import './Topics.css';

class Topics extends Component {
    state = {
        topics: [],
        error: {}
    }
    render() {
        return (
            <div className="topics">
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                {[...this.state.topics].map(topic => {
                    return <div key={topic._id} className="topic-item"><Link to={`/topics/${topic.slug}/articles`}>{topic.title}</Link></div>
                })}
            </div>
        );
    }

    componentDidMount() {
        this.getAllTopics();
    }

    getAllTopics() {
        api.getAllTopics()
            .then(res => {
                this.setState({ topics: res.topics })
            })
            .catch(err => {
                this.setState({
                    error: {
                        code: err.response.status,
                        message: err.response.data.message
                    }
                })
            })
    }
}




export default Topics;