import React, { Component } from 'react';
import * as api from '../api';


class PostComment extends Component {
    state = {
        comment: {
            body: '',
            created_by: "5b64816a0318403e159e7dbd"
        }
    }
    render() {
        return (
            <div className="post-comment">
                <form onSubmit={this.handleSubmit}>
                    <textarea name="post-comment" value={this.state.comment.body} onChange={this.handleChange} placeholder="Put your thoughts in here!"></textarea>
                    <br />
                    <br />
                    {this.state.comment.body && <button className="submit-comment">Submit</button>}
                </form>
            </div >
        );
    }

    handleChange = (event) => {
        this.setState({
            comment: {
                ...this.state.comment,
                body: event.target.value
            }
        })
    }

    handleSubmit = (event) => {
        const comment = this.state.comment;
        event.preventDefault();
        api.postCommentByArticleId(this.props.id, comment)
            .then(res => {
                this.setState({
                    comment: {
                        ...this.state,
                        body: ''
                    }
                })
                this.props.activateComments();
            })
            .catch(console.log)
    }


}


export default PostComment;

//created_by to be changed with checked active user from app

//comment max length to be considered as a feature

