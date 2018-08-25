import axios from 'axios';

const URL = 'https://ncnewsbend.herokuapp.com/api';

export const getAllTopics = () => {
    return axios.get(`${URL}/topics`)
        .then(res => res.data)
};

export const getArticlesByTopic = (topic_slug) => {
    return axios.get(`${URL}/topics/${topic_slug}/articles`)
}

export const getAllArticles = () => {
    return axios.get(`${URL}/articles`)
}

export const getArticleById = (article_id) => {
    return axios.get(`${URL}/articles/${article_id}`)
}

export const getCommentsByArticleId = (article_id) => {
    return axios.get(`${URL}/articles/${article_id}/comments`)
}

export const postCommentByArticleId = (article_id, commentObj) => {
    return axios.post(`${URL}/articles/${article_id}/comments`, commentObj)
}

export const deleteComment = (comment_id) => {
    return axios.delete(`${URL}/comments/${comment_id}`)
}

export const updateVoteByArticleId = (article_id, choice) => {
    return axios.put(`${URL}/articles/${article_id}?vote=${choice}`)
}

export const updateVoteByCommentId = (comment_id, choice) => {
    return axios.put(`${URL}/comments/${comment_id}?vote=${choice}`)
}

//.catch and then invoke an api function that takes to an error page
//error page with conditional rendering based on err response





// export const getArticles = async () => {
//     try {
//         const articles = await axios.get(`${URL}/articles`);
//         return articles;
//     } catch (err) { console.log(err) }
// };