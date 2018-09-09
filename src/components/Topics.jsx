import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../api';

class Topics extends Component {
    state = {
        topics: [],
        error: {}
    }
    render() {
        return (
            <div className="topics">
                <h1>Topics</h1>
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                {[...this.state.topics].map(topic => {
                    return <Fragment key={topic._id}><Link to={`/topics/${topic.slug}/articles`}><div className="topic-item"><p>{topic.title}</p></div></Link></Fragment>
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

Topics.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Topics;