// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss'

// Components
import Login from '../../Components/Login/Login';

const Landing = () => {
    return (
        <main className='landing'>
            <header className='landing__header'>
                <Link className='nav-link' to={'/home'}>
                    <h1 className='landing__title'>Angler</h1>
                </Link>
                <p className='landing__subtext'>Your FFXIV fishing companion</p>
            </header>
            <Login/>  
        </main>
    );
};

export default Landing;