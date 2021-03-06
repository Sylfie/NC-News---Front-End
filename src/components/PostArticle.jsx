import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as api from '../api';


class PostArticle extends Component {
    state = {
        newArticle: {
            title: "",
            body: "",
            created_by: "5b64816a0318403e159e7dbd"
        },
        topic: '',
        error: {},
        sentArticle: false
    }
    render() {
        return (
            <div className="post-article">
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                <form onSubmit={this.handleSubmit}>
                    <Fragment>
                        <p>Topic:</p>
                        {this.props.topic_slug && <span>{this.props.topic_slug}</span>}
                        {this.props.topic_slug === undefined && <select onChange={this.handleOptions}>
                            <option value="" defaultValue>Choose a topic</option>
                            <option value="coding">Coding</option>
                            <option value="football">Football</option>
                            <option value="cooking">Cooking</option>
                        </select>}
                        <br />
                        <br />
                    </Fragment>
                    <input type="text" name="title" value={this.state.newArticle.title} onChange={this.handleChange} placeholder="Select a title" />
                    <br />
                    <br />
                    <textarea cols="50" rows="40" name="body" value={this.state.newArticle.body} onChange={this.handleChange} placeholder="Put your thoughts in here!"></textarea>
                    <br />
                    <br />
                    <button disabled={!this.checkValidation()} className="submit-article btn">Post article</button>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.sentArticle && !this.state.newArticle.title) this.props.updateArticles();
        // console.log('trying to post an article!')
    }

    handleChange = (event) => {
        this.setState({
            newArticle: {
                ...this.state.newArticle,
                [event.target.name]: event.target.value
            }
        })
    }

    checkValidation = () => {
        if (this.props.topic_slug) {
            return (this.state.newArticle.title && this.state.newArticle.body) ? true : false;
        } else {
            return (this.state.newArticle.title && this.state.newArticle.body && this.state.topic) ? true : false;
        }
    }

    handleSubmit = (event) => {
        const topic = this.props.topic_slug ? this.props.topic_slug : this.state.topic
        event.preventDefault();
        api.postArticleByTopicSlug(topic, this.state.newArticle)
            .then(res => {
                this.setState({
                    newArticle: {
                        ...this.state.newArticle,
                        title: '',
                        body: ''
                    },
                    sentArticle: true
                })
                this.props.updateArticles();
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

    handleOptions = (event) => {
        this.setState({
            ...this.state,
            topic: event.target.value
        })
    }
}

PostArticle.propTypes = {
    updateArticles: PropTypes.func.isRequired,
    topic_slug: PropTypes.strting
};

export default PostArticle;


 //upon submitting select should go back to default

