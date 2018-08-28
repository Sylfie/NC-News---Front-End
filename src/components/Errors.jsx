import React from 'react';
import PropTypes from 'prop-types';

const Errors = (props) => {
    const errorCode = props.location.state.error.code;
    let h1 = '';
    errorCode === 400 ? h1 = "Oops, something's not right here!" : errorCode === 404 ? h1 = "Oh no! We can't find what you were looking for. A ninja stole this page!" : "Well... it seems like we aren't on our best behaviour today."
    console.log(props)
    return (
        < div >
            <h1>{h1}</h1>
            <h3>({props.location.state.error.message})</h3>
        </div >
    );
};

Errors.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Errors;