// Dependencies
import React, { useState, useEffect } from 'react';
import './WatchlistsView.scss';

// Components
import Nav from '../../Components/Nav/Nav';
import Watchlist from '../../Components/Watchlist/Watchlist';

const WatchlistsView = () => {
    const API = import.meta.env.VITE_API;
    const [watchlists, setWatchlists] = useState([]);

    useEffect(() => {
        fetch(`${API}/watchlists`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    alert('Please log in for full experience')
                    setWatchlists([])
                } else {
                    setWatchlists((prevState) => res)
                }
            })
            .catch(err => console.error(err))
    },[watchlists]);

    return (
        <main className='watchlists'>
            <Nav/>
            <Watchlist newList={true}/>
            {watchlists.map((list) => {
                return(
                   <Watchlist newList={false} key={list.id} id={list.id} name={list.name} description={list.description} favorite={list.is_favorite}/>
                )
            })}
        </main>
    );
};

export default WatchlistsView;