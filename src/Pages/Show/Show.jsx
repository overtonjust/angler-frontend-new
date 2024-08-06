// Dependencies
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orangeScrip from '../../assets/orangeScrip.png';
import purpleScrip from '../../assets/purpleScrip.png';
import aetheryte from '../../assets/aetheryte.png';
import { weatherMap } from '../../../utils';
import './Show.scss';

// Components
import Nav from '../../Components/Nav/Nav';
import Select from 'react-select';

const Show = () => {
    const API = import.meta.env.VITE_API;
    const { id } = useParams();
    const [userWatchlists, setUserWatchlists] = useState([]);
    const[currFish, setCurrFish] = useState({
        id: '',
        name: '',
        image: '',
        icon: '',
        bait: [],
        scrip_type: '',
        region: '',
        area: '',
        time_window: '',
        weather_found: [],
        closest_aetheryte: ''
    });
    const [watchlistOptions, setWatchlistOptions] = useState([
        {value: '', label: ''}
    ]);
    const [chosenOption, setChosenOption] = useState('My watchlists');
    const [fishToAdd, setFishToAdd] = useState({
        watchlist_id: '',
        fish_id: id
    });

    const handleSelect = (selectedOption) => {
        setChosenOption(selectedOption)
        setFishToAdd((prevState) => {
            return{...prevState, watchlist_id: selectedOption.value}
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API}/finder`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(fishToAdd),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.error) {
                    alert(`${currFish.name} is already in ${chosenOption.label}`)
                } else {
                    alert(`${currFish.name} added`)
                }
            })
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetch(`${API}/index/${id}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                setCurrFish(res)
            })
            .catch(err => console.error(err))
    },[currFish]);

    useEffect(() => {
        fetch(`${API}/watchlists`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    setUserWatchlists([])
                } else {
                    setUserWatchlists((prevState) => res)
                    setWatchlistOptions((prevState) => {
                        return res.map((watchlist) => {
                           return  {value: watchlist.id, label: watchlist.name}
                        })
                    })
                }
            })
            .catch(err => console.error(err))
    },[]);

    return (
        <form className='show-form' onSubmit={handleSubmit}>
            <Nav/>
            <article className='showcard'>
                <img className='showcard__image' src={currFish.image} alt={currFish.name} />
                <header className='showcard__header'>
                    <h2 className='showcard__title'>{currFish.name}</h2>
                    <div className='weather-box'>
                        {currFish.weather_found.map((weather, index) => {
                            return(
                                <img key={`${weather} ${index}`} className='weather-box__image' src={weatherMap[weather]}/>
                            )
                        })}
                    </div>
                    <img className='filter-holder__button-img' src={currFish.scrip_type = 'Orange' ? orangeScrip : purpleScrip} alt={currFish.scrip_type} />
                </header>
                <section className='showcard__details'>
                    <div className='showcard__item-box'>
                        <span className='showcard__label'>Time found:</span><p className='showcard__text'> {currFish.time_window}</p>
                    </div>
                    <div className="showcard__item-box">
                        <span className='showcard__label'>Location:</span><p className='showcard__text'>{currFish.region} - {currFish.area} </p>
                    </div>
                    <div className='showcard__item-box'>
                        <span className='showcard__aetheryte-box showcard__label'><img className='showcard__icon' src={aetheryte} alt="aetheryte" /></span><p className='showcard__text'> - {currFish.closest_aetheryte}</p>
                        
                    </div>
                    <div className='showcard__item-box'>
                        <ul className='showcard__list '>
                            <span className='showcard__label'>Bait:</span>
                            {currFish.bait.map((bait, index) => {
                                return(
                                    <li key={`${bait} ${index}`} className='showcard__list-item'>
                                        {bait}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
                {userWatchlists[0] && 
                    <>
                        <Select
                        className='showcard__dropdown'
                        value={chosenOption}
                        onChange={handleSelect}
                        placeholder={chosenOption}
                        isClearable={false}
                        options={watchlistOptions}
                        styles={{
                            control:(base) => ({
                                ...base,
                                border: '2px solid black',
                                borderRadius: '1em',
                                fontSize: '1em',
                                boxShadow: 'none',
                                cursor: 'pointer'
                            }),
                            menu: (base) => ({
                                ...base,
                                color: '#5b5b5b',
                                fontSize: '1em',
                                
                            }),
                            option: (base) => ({
                                ...base,
                                backgroundColor: '#fff',
                                color: '#5b5b5b',
                                cursor: 'pointer',
                                ":hover": {
                                    backgroundColor: 'rgba(0, 176, 255,.4);'
                                },
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: 'black'
                            })               
                        }}
                        /> 
                        <input className='showcard__submit' type="submit" value={'Add to watchlist'} />
                    </>
            }
            </article>
        </form>
    );
};

export default Show;