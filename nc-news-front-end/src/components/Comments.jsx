import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../api';
import PostComment from './PostComment';

class Comments extends Component {
    state = {
        comments: [],
        commentsActive: false,
        commentDeleted: false,
        error: {}
    }
    render() {
        return (
            <div>
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                <PostComment id={this.props.id} updateComments={this.updateComments} activateComments={this.activateComments} />
                {!this.state.commentsActive && <Link to={`/articles/${this.props.id}/comments`}><button className="seeComments"
                    onClick={this.activateComments}>See Comments</button></Link>}
                {this.state.comments.length > 0 && <div className="comments">
                    {[...this.state.comments].map(comment => {
                        return (
                            <Fragment key={comment._id}>
                                <div className="comment-user">
                                    <div className="user-details">
                                        <p>posted by: <Link to={`/users/${comment.created_by.username}`}>{comment.created_by.username}</Link></p>
                                        <p>posted at: {`${comment.created_at.slice(11, 16)}  ${comment.created_at.slice(8, 10)}-${comment.created_at.slice(5, 7)}-${comment.created_at.slice(0, 4)}`}</p>
                                    </div>
                                    <p>{comment.body}</p>
                                </div>
                                {comment.created_by._id !== this.props.activeUser && <div className="comment-body">
                                    <button className="vote-up" onClick={() => this.commentVote(comment._id, 'up')}> + </button>
                                    {'   '}
                                    {comment.votes}
                                    {'   '}
                                    <button className="vote-down" onClick={() => this.commentVote(comment._id, 'down')}> - </button>
                                </div>}
                                {comment.created_by._id === this.props.activeUser && <button onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
                                <hr />
                            </Fragment>
                        )
                    })}
                </div>}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if ((this.state.commentsActive && this.state.comments.length === 0) || (this.state.commentDeleted && this.state.comments.length !== 0)) {
            this.getCommentsByArticleId(this.props.id)
        };
    }

    getCommentsByArticleId = (params) => {
        api.getCommentsByArticleId(params)
            .then(res => {
                this.setState({
                    comments: res.data.comments,
                    commentsActive: true,
                    commentDeleted: false
                })
            })
    }

    deleteComment = (params) => {
        api.deleteComment(params)
            .then(res => {
                this.setState({
                    ...this.state,
                    commentDeleted: true
                })
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
    commentVote = (comment_id, choice) => {
        api.updateVoteByCommentId(comment_id, choice)
            .then(res => console.log(res.data))
            .catch(err => err)
    }

    activateComments = () => {
        this.setState({
            commentsActive: true
        })
    }
}


//deleted comment to disappear

export default Comments;