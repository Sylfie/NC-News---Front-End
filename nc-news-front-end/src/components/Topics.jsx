import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import './Topics.css';

class Topics extends Component {
    state = {
        topics: []
    }
    render() {
        return (
            <ul>
                {[...this.state.topics].map(topic => {
                    return <li key={topic.id}><Link to={`/topics/${topic.slug}/articles`}>{topic.title}</Link></li>
                })}
            </ul>
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
            .catch(err => console.log(err));
    }
}




export default Topics;