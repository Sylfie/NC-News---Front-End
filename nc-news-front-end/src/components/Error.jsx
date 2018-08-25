import React from 'react';

const Error = (props) => {
    console.log(props)
    const errorCode = props.location.state.error.code;
    const message = props.location.state.error.message;
    if (errorCode === 400) {
        return (
            < div >
                <h1>Oops, something's not right here! ({message})</h1>
            </div >
        );
    } else if (errorCode === 404) {
        return (
            < div >
                <h1>Oh no! We can't find what you were looking for ({message})</h1>
            </div >
        );
    } else {
        return (
            <div>
                <h1>Well, it seems like we couldn't do our best today ({message})</h1>
            </div>
        );
    }
};

export default Error;