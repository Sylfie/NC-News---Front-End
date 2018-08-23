import React, { Component } from 'react';

class postArticle extends Component {
    state = {
        newArticle: {
            title: "",
            body: "",
            created_by: ""
        }
    }
    render() {
        return (
            <div>
                Got something interesting to share?
            </div>
        );
    }
}

export default postArticle;