import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import PostArticle from './PostArticle';

class Articles extends Component {
    state = {
        articles: [],
        postArticle: false
    }

    render() {
        return (
            <div className="articles">
                <h1>Articles</h1>
                <Fragment>
                    <p>Got something interesting to share?</p>
                    <button onClick={this.togglePostArticle}>Post your own!</button>
                    <hr />
                </Fragment>
                {this.state.postArticle && <PostArticle postArticle={this.state.postArticle} topic_slug={this.props.match.params.topic_slug} />}
                {!this.state.postArticle && [...this.state.articles].map(article => {
                    return <Fragment key={article._id} item={article}>
                        <h3>{article.title}</h3>
                        <p>{`${article.body.slice(0, 100)}...`}</p>
                        <p>Created at: {`${article.created_at.slice(11, 16)}  ${article.created_at.slice(8, 10)}-${article.created_at.slice(5, 7)}-${article.created_at.slice(0, 4)}`}</p>
                        <p>Tagged in: <Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p> {/*links to topics?*/}
                        <p>Comments: WORK IN PROGRESS</p>
                        <Link to={`/articles/${article._id}`}><button className="seeArticle">See Full Article</button></Link>
                    </Fragment>
                })}
            </div>
        );
    }

    componentDidMount() {
        this.getArticles(this.props.match.params.topic_slug)
    }

    getArticles = (params) => {
        if (params !== undefined) {
            api.getArticlesByTopic(params)
                .then(res => {
                    this.setState({
                        articles: res.data.articles
                    })
                })
                .catch(err => console.log(err))
        } else {
            api.getAllArticles()
                .then(res => {
                    this.setState({
                        articles: res.data.articles
                    })
                })
                .catch(err => console.log(err))
        }
    }

    togglePostArticle = () => {
        console.log('trying to toggle')
        this.setState({
            postArticle: true
        })
    }
}

export default Articles;