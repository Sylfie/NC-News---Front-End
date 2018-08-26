import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../api';

class User extends Component {
    state = {
        user: {},
        error: {}
    }
    render() {
        return (
            <div className="user">
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                {this.state.user._id && <Fragment>
                    <p>Username: {this.state.user.username}</p>
                    <p>Name: {this.state.user.name}</p>
                    <img src={this.state.user.avatar_url} alt="user avatar" />
                </Fragment>}
            </div>
        );
    }

    componentDidMount() {
        this.getUserByUsername(this.props.match.params.username)
    }

    getUserByUsername = (username) => {
        api.getUserByUsername(username)
            .then(res =>
                this.setState({
                    user: res.data.user
                }))
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

export default User;

//props to be passed from article or comments