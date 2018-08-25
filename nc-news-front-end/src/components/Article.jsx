import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import Comments from './Comments';
import './Article.css';

class Article extends Component {
    state = {
        article: {},
        activeUser: this.props.activeUser
    }

    render() {
        return (
            < div className="article" >
                {
                    this.state.article.title &&
                    <Fragment>
                        <h3>{this.state.article.title}</h3>
                        <p>{this.state.article.body}</p>
                        <p>Created at: {`${this.state.article.created_at.slice(11, 16)}  ${this.state.article.created_at.slice(8, 10)}-${this.state.article.created_at.slice(5, 7)}-${this.state.article.created_at.slice(0, 4)}`}</p>
                        <div>
                            <button className="vote-up" onClick={() => this.articleVote(this.state.article._id, 'up')}> + </button>
                            {'   '}
                            {this.state.article.votes}
                            {'   '}
                            <button className="vote-down" onClick={() => this.articleVote(this.state.article._id, 'down')}> - </button>
                        </div>
                        <p>Tagged in: <Link to={`/topics/${this.state.article.belongs_to}/articles`}>{this.state.article.belongs_to}</Link></p>
                        <p>Comments: WORK IN PROGRESS</p>
                        <Comments id={this.state.article._id} activeUser={this.state.activeUser} />
                    </Fragment>
                }
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
            .catch(err => console.log(err))
    }
    articleVote = (article_id, choice) => {
        api.updateVoteByArticleId(article_id, choice)
            .then(res => console.log(res.data))
    }
}



//delete a comment

export default Article;