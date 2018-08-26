import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../api';
import Comments from './Comments';
import './Article.css';

class Article extends Component {
    state = {
        article: {},
        activeUser: this.props.activeUser,
        error: {},
        articleVote: ''
    }

    render() {
        return (
            < div className="article" >
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                {this.state.article.title &&
                    <Fragment>
                        <h3>{this.state.article.title}</h3>
                        <p>{this.state.article.body}</p>
                        <p>Created at: {`${this.state.article.created_at.slice(11, 16)}  ${this.state.article.created_at.slice(8, 10)}-${this.state.article.created_at.slice(5, 7)}-${this.state.article.created_at.slice(0, 4)}`}</p>
                        <p> Created by: <Link to={`/users/${this.state.article.created_by.username}`}>{this.state.article.created_by.username}</Link></p>
                        <div>
                            {!this.state.articleVote && <button className="vote-up" onClick={() => this.articleVote(this.state.article._id, 'up')}> + </button>}
                            {'   '}
                            {this.state.article.votes}
                            {'   '}
                            {this.state.articleVote && <p>{`Thanks for ${this.state.articleVote}voting!`}</p>}
                            {!this.state.articleVote && <button className="vote-down" onClick={() => this.articleVote(this.state.article._id, 'down')}> - </button>}
                        </div>
                        <p>Tagged in: <Link to={`/topics/${this.state.article.belongs_to}/articles`}>{this.state.article.belongs_to}</Link></p>
                        <p>Comments: WORK IN PROGRESS</p>
                        <Comments id={this.state.article._id} activeUser={this.state.activeUser} />
                    </Fragment>}
            </div >
        );
    }

    componentDidMount() {
        this.getArticle(this.props.match.params.article_id)
    }

    getArticle = (params) => {
        api.getArticleById(params)
            .then(res => {
                this.setState({
                    ...this.state,
                    article: { ...res.data.article }
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
    articleVote = (article_id, choice) => {
        api.updateVoteByArticleId(article_id, choice)
            .then(res => {
                console.log(res.data)
                let vote = this.state.article.votes;
                choice === 'up' ? vote++ : vote--;
                this.setState({
                    ...this.state,
                    article: {
                        ...this.state.article,
                        votes: vote
                    },
                    articleVote: choice
                })
            })

    }
}

export default Article;

//optimistic rendering on article votes, Back-end 201 request sent in the background