import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';
import './Article.css';

class Article extends Component {
    state = {
        article: {},
        comments: []
    }

    render() {
        return (
            < div className="article" >
                {
                    this.state.article.title &&
                    <Fragment>
                        <h3>{this.state.article.title}</h3>
                        <p>{`${this.state.article.body.slice(0, 100)}...`}</p>
                        <p>Created at: {`${this.state.article.created_at.slice(11, 16)}  ${this.state.article.created_at.slice(8, 10)}-${this.state.article.created_at.slice(5, 7)}-${this.state.article.created_at.slice(0, 4)}`}</p>
                        <div>
                            <button value='+'> + </button>
                            {'   '}
                            {this.state.article.votes}
                            {'   '}
                            <button value='-'> - </button>
                        </div>
                        <p>Tagged in: <Link to={`/topics/${this.state.article.belongs_to}/articles`}>{this.state.article.belongs_to}</Link></p>
                        <p>Comments: WORK IN PROGRESS</p>
                        <Link to={`/articles/${this.state.article._id}/comments`}><button className="seeComments"
                            onClick={() => this.getCommentsByArticleId(this.props.match.params.article_id)}>See Comments</button></Link>
                    </Fragment>
                }
                {this.state.comments.length > 0 && <div className="comments">
                    {[...this.state.comments].map(comment => {
                        return (
                            < Fragment >
                                <p>{comment.body}</p>
                            </Fragment>
                        )
                    })}
                </div>}
            </div >
        );
    }

    // showComments = (comments) => {
    //     {/* ThIS SHOULD LIVE IN COMMENT C! article_id to be passed to it from props, axios request to get all comments by article id */ }
    //     return [...comments].map(comment => {
    //         return <div>
    //             <div>
    //                 <p>Created by:{comment.created_at}</p>
    //                 <p>Created at:{comment.created_by}</p>
    //             </div>
    //             <div>
    //                 <p>{comment.body}</p>
    //                 <div>
    //                     <button value='+'> + </button>
    //                     {'   '}
    //                     {comment.votes}
    //                     {'   '}
    //                     <button value='-'> - </button>
    //                 </div>
    //             </div>
    //         </div>
    //     })
    // }

    componentDidMount() {
        this.getArticle(this.props.match.params.article_id)
    }

    getArticle = (params) => {
        api.getArticleById(params)
            .then(res => {
                this.setState({
                    article: { ...res.data.article }
                })
            })
            .catch(err => console.log(err))
    }

    getCommentsByArticleId = (params) => {
        api.getCommentsByArticleId(params)
            .then(res => {
                this.setState({
                    comments: { ...res.data.comments }
                })
            })
    }
}

//COMENTS NOT RENDERING ON SCREEN YET!

//post article f?

export default Article;