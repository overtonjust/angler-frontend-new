// Dependencies
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    const API = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        fetch(`${API}/logout`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => navigate('/'))
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetch(`${API}/auth/status`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                res.error ? setLoggedIn(false) : setLoggedIn(true)
            })
            .catch(err => console.error(err))
    },[loggedIn]);

    return (
        <nav className='mobile-heading'>
            <article className='mobile-heading__navs'>
                <Link className='nav-link' to={'/home'}>
                    <h1 className='mobile-heading__title'>Angler{loggedIn ? '' : ' (Guest view)'}</h1>
                </Link>
                <div className='nav-links'>
                    {loggedIn && 
                        <Link className='nav-link' to={'/mywatchlists'}>
                            <h4 className='mobile-heading__log nav-link'>My Watchlists</h4>
                        </Link>
                    }
                    <h4 onClick={handleLogout} className='mobile-heading__log nav-link'>{loggedIn ? 'Log out' : 'Log in'}</h4>
                </div>
            </article>
            <p className='mobile-heading__subtext'>Your FFXIV fishing companion</p>
        </nav>
    );
};

export default Nav;