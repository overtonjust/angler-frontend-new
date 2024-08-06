// Dependencies
import React, { useState, useEffect } from 'react';
import orangeScrip from '../../assets/orangeScrip.png';
import purpleScrip from '../../assets/purpleScrip.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { weatherMap } from '../../../utils';
import { Link } from 'react-router-dom';
import './Home.scss';

// Components
import Nav from '../../Components/Nav/Nav';

const Home = () => {
    const API = import.meta.env.VITE_API;
    const [fishList, setFishList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [userWatchlists, setUserWatchlists] = useState([]);
    const [filter, setFilter] = useState({ name: 'Popular Catches', id: null});


    const filterByWatchlistId = (id) => {
        fetch(`${API}/watchlists/${id}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setFilteredList((prevState) => res.fish)
            })
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetch(`${API}/index`)
            .then(res => res.json())
            .then(res => {
                setFishList((prevState) => res)
                setFilteredList((prevState) => res)
            })
            .catch(err => console.error(err))
    },[]);

    useEffect(() => {
        fetch(`${API}/watchlists`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    alert('Please log in for full experience')
                    setUserWatchlists([])
                } else {
                    setUserWatchlists((prevState) => res)
                }
            })
            .catch(err => console.error(err))
    },[]);

    useEffect(() => {
        switch(filter.name) {
            case 'Popular Catches':
                setFilteredList((prevState) => fishList)
                break;
            case 'Orange Scrips':
                const orangeFish = fishList.filter((fish) => fish.scrip_type === 'Orange')
                setFilteredList((prevState) => orangeFish)
                break;
            case 'Purple Scrips':
                const purpleFish = fishList.filter((fish) => fish.scrip_type === 'Purple')
                setFilteredList((prevState) => purpleFish)
                break;
            default:
                filterByWatchlistId(filter.id)
                break;
                
        }
    }, [filter]);

    return (
        <main className='home'>
            <Nav/>
            <article className='filter-holder'>
                <button onClick={() => setFilter({name: 'Popular Catches', id: null })} className='filter-holder__button'><FontAwesomeIcon className='filter-holder__button-icon' icon={faRectangleList}/>View All</button>
                <button onClick={() => setFilter({name: 'Orange Scrips', id: null })} className='filter-holder__button'><img className='filter-holder__button-img' src={orangeScrip} alt="orange gatherer's scrip" />Orange</button>
                <button onClick={() => setFilter({name: 'Purple Scrips', id: null })} className='filter-holder__button'><img className='filter-holder__button-img' src={purpleScrip} alt="purple gatherer's scrip" />Purple</button>
                {userWatchlists.map((watchlist) => {
                    return (
                        <button onClick={() => setFilter({name: watchlist.name, id: watchlist.id})} key={watchlist.id} className='filter-holder__button'><FontAwesomeIcon className='filter-holder__button-icon' icon={faClipboardList}/>{watchlist.name}</button>
                    )
                })}
            </article>
            <article className='index'>
                <h2 className='index__title'>{filter.name}</h2>
                <section className='index__fish-bucket'>
                    {filteredList.map((fish) => {
                        return(
                        <Link to={`/fish/${fish.id}`} key={fish.id} className='index__fish'>
                            <div className='index__rows'>
                                <div className='index__image-holder'>
                                    <img className='index__image' src={fish.icon} alt="" />
                                    <div className='weather-box'>{fish.weather_found.map((weather, index) => {
                                        return (
                                            <img key={index} className='weather-box__image' src={weatherMap[weather]}/>
                                        )
                                    })}</div>
                                    <img className='index__scrip' src={fish.scrip_type === 'Purple' ? purpleScrip : orangeScrip}/>
                                </div>
                                <div className='index__name-holder'>
                                    <p className='index__name'>{fish.name} </p>
                                    <p className='index__text'>- {fish.region}</p>
                                </div>
                            </div>
                        </Link>
                        )
                    })}
                </section>
            </article>
        </main>
    );
};

export default Home;