// Dependencies
import React from 'react';
import './Error.scss';

// Components
import Nav from '../../Components/Nav/Nav';

const Error = () => {
    return (
        <main className='catch'>
            <Nav/>
            <h1 className='bad-route'>
                Sorry couldn't find that one maybe check your spelling?
            </h1>
        </main>
    );
};

export default Error;