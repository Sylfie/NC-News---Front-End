import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
                <h1>Articles</h1>
                <Fragment>
                    <p>Got something interesting to share?</p>
                    <button onClick={this.togglePostArticle}>Post your own!</button>
                    <hr />
                </Fragment>
                {this.state.postArticle && <PostArticle updateArticles={this.updateArticles} topic_slug={this.props.match.params.topic_slug} />}
                {!this.state.postArticle && [...this.state.articles].map(article => {
                    return <div key={article._id} item={article}>
                        <h3>{article.title}</h3>
                        <p>{`${article.body.slice(0, 100)}...`}</p>
                        <p>Created at: {`${article.created_at.slice(11, 16)}  ${article.created_at.slice(8, 10)}-${article.created_at.slice(5, 7)}-${article.created_at.slice(0, 4)}`}</p>
                        <p>Tagged in: <Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p> {/*links to topics?*/}
                        <p>Comments: WORK IN PROGRESS</p>
                        <Link to={`/articles/${article._id}`}><button className="seeArticle">See Full Article</button></Link>
                    </div>
                })}
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
            console.log('we can update!')
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

export default Articles;

//componentDidUpdate is not rerendering the latest posted article, no change is articles arr length after post