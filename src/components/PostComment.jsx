import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as api from '../api';


class PostComment extends Component {
    state = {
        comment: {
            body: '',
            created_by: "5b64816a0318403e159e7dbd"
        },
        error: {}
    }
    render() {
        return (
            < div className="post-comment" >
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                <form onSubmit={this.handleSubmit}>
                    <textarea cols="35" rows="5" name="post-comment" value={this.state.comment.body} onChange={this.handleChange} placeholder="Share what you think!"></textarea>
                    <br />
                    <br />
                    {this.state.comment.body && <button className="submit-comment btn">Submit</button>}
                </form>
            </div >
        );
    }

    handleChange = (event) => {
        this.setState({
            comment: {
                ...this.state.comment,
                body: event.target.value
            },
            readyToPost: true
        })
    }

    handleSubmit = (event) => {
        const comment = this.state.comment;
        event.preventDefault();
        api.postCommentByArticleId(this.props.id, comment)
            .then(res => {
                this.setState({
                    comment: {
                        ...this.state.comment,
                        body: ''
                    },
                    readyToPost: false
                })
                this.props.activateComments();
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

PostComment.propTypes = {
    id: PropTypes.string.isRequired,
    activateComments: PropTypes.func.isRequired
};


export default PostComment;

//post comment rerenders with new comment, posting again doesn't refresh


//comment max length to be considered as a potential feature

