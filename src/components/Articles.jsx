import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../api';
import PostArticle from './PostArticle';

class Articles extends Component {
    state = {
        articles: [],
        postArticle: false,
        postedArticle: false,
        error: {}
    }

    render() {
        return (
            <div className="articles">
                {this.state.error.code && <Redirect to={{ pathname: "/error", state: { error: this.state.error } }} />}
                {this.props.match.params.topic_slug !== undefined ? <h1>{this.props.match.params.topic_slug[0].toUpperCase() + this.props.match.params.topic_slug.slice(1)} Articles</h1> : <h1>Articles</h1>}
                <Fragment>
                    <p>Got something interesting to share?</p>
                    <button className="post-article-btn waves-effect waves-light btn" onClick={this.togglePostArticle}>Post your own!</button>
                </Fragment>
                {this.state.postArticle && <PostArticle updateArticles={this.updateArticles} topic_slug={this.props.match.params.topic_slug} />}
                <Fragment>
                    {!this.state.postArticle && [...this.state.articles].map(article => {
                        return <div className="article" key={article._id} item={article}>
                            <Link to={`/articles/${article._id}`}><h3>{article.title}</h3></Link>
                            <p>{`${article.body.slice(0, 100)}...`}</p>
                            {article.created_by.username && <p>created by: {article.created_by.username}</p>}
                            <p>created at: {`${article.created_at.slice(11, 16)}  ${article.created_at.slice(8, 10)}-${article.created_at.slice(5, 7)}-${article.created_at.slice(0, 4)}`}</p>
                            <p>tagged in: <Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p> {/*links to topics?*/}
                            <p>comments: {article.comment_count}</p>
                            <Link to={`/articles/${article._id}`}><button className="seeArticle btn waive-light">View Full Article</button></Link>
                            <hr />
                        </div>
                    })}
                </Fragment>
            </div>
        );
    }

    componentDidMount() {
        this.getArticles(this.props.match.params.topic_slug)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.postedArticle && this.state.articles.length === prevState.articles.length) {
            this.getArticles(this.props.match.params.topic_slug)
            this.setState({
                postedArticle: false
            })
        }
    }

    getArticles = (params) => {
        if (params !== undefined) {
            api.getArticlesByTopic(params)
                .then(res => {
                    this.setState({
                        articles: res.data.articles
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
        } else {
            api.getAllArticles()
                .then(res => {
                    this.setState({
                        articles: res.data.articles
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
    }

    togglePostArticle = () => {
        this.setState({
            postArticle: true
        })
    }

    updateArticles = () => {
        this.setState({
            postArticle: false,
            postedArticle: true
        })
    }
}

Articles.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Articles;