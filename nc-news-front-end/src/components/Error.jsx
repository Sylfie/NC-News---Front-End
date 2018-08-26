import React from 'react';

const Error = (props) => {
    const errorCode = props.location.state.error.code;
    let h1 = '';
    errorCode === 400 ? h1 = "Oops, something's not right here!" : errorCode === 404 ? h1 = "Oh no! We can't find what you were looking for. A ninja stole this page!" : "Well... it seems like we aren't on our best behaviour today."
    return (
        < div >
            <h1>{h1}</h1>
            <h3>({props.location.state.error.message})</h3>
        </div >
    );
};

export default Error;