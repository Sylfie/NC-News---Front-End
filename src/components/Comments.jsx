import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../api';
import PostComment from './PostComment';

class Comments extends Component {
    state = {
        comments: [],
        commentsActive: false,
        commentDeleted: false,
        error: {},
        votedCommentIndex: -1
    }
    render() {
        console.log(this.props)
        return (
            <div>
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                <PostComment id={this.props.id} activateComments={this.activateComments} />
                {!this.state.commentsActive && <Link to={`/articles/${this.props.id}/comments`}><button className="see-comments btn"
                    onClick={this.activateComments}>See Comments</button></Link>}
                {this.state.comments.length > 0 && <div className="comments">
                    {[...this.state.comments].map(comment => {
                        return (
                            <Fragment key={comment._id}>
                                <div className="comment-user">
                                    <div className="user-details">
                                        <p>posted by: <Link to={`/users/${comment.created_by.username}`}>{comment.created_by.username}</Link></p>
                                        <img src={comment.created_by.avatar_url} alt={`${comment.created_by.username}'s avatar`} />
                                        <p>posted at: {`${comment.created_at.slice(11, 16)}  ${comment.created_at.slice(8, 10)}-${comment.created_at.slice(5, 7)}-${comment.created_at.slice(0, 4)}`}</p>
                                    </div>
                                    <p>{comment.body}</p>
                                </div>
                                {comment.created_by._id !== this.props.activeUser && <div className="comment-body">
                                    {this.state.votedCommentIndex !== this.state.comments.indexOf(comment) ? <Fragment>
                                        <button className="vote-up" onClick={() => this.commentVote(comment._id, 'up', comment)}> + </button>
                                        {'   '}
                                        <span>votes: {comment.votes}</span>
                                        {'   '}
                                        <button className="vote-down" onClick={() => this.commentVote(comment._id, 'down', comment)}> - </button>
                                    </Fragment> :
                                        <Fragment>
                                            <p>Thanks for voting!</p>
                                            <p>votes: {comment.votes}</p>
                                        </Fragment>}
                                </div>}
                                {comment.created_by._id === this.props.activeUser && <button className="btn" onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
                                <hr />
                            </Fragment>
                        )
                    })}
                </div>}
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.commentsActive && this.state.comments.length === 0) || (this.state.commentDeleted && this.state.comments.length !== 0) || (prevState.votedCommentIndex !== this.state.votedCommentIndex && this.state.comments.length !== 0)) {
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
    commentVote = (comment_id, choice, comment) => {
        let index = this.state.comments.indexOf(comment);
        api.updateVoteByCommentId(comment_id, choice)
            .then(res => {
                let vote = comment.votes;
                choice === 'up' ? vote++ : vote--;
                let optimisticUpdate = this.state.comments
                optimisticUpdate[index].votes === res.data.comment.votes
                this.setState({
                    ...this.state,
                    comments: optimisticUpdate,
                    votedCommentIndex: index
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

    activateComments = () => {
        this.setState({
            commentsActive: true
        })
    }
}

Comments.propTypes = {
    id: PropTypes.string.isRequired,
    activeUser: PropTypes.string.isRequired
};


//deleted comment to disappear

export default Comments;