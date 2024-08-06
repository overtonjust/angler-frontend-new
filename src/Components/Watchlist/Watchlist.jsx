// Dependencies
import React, { useState, useEffect, Children } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import './Watchlist.scss';

const Watchlist = ({id, name, description, favorite, newList}) => {
    const API = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [newForm, setNewForm] = useState(false);
    const [watchlistData, setWatchlistData] = useState({
        id: id || '',
        name: name || '',
        description: description || '',
        favorite: favorite || false
    });

    const handleChange = (e) => {
        setWatchlistData((prevState) => {
            return  {...prevState, [e.target.name]: e.target.value}
        })
    };

    const addNewList = (e) => {
        e.preventDefault();

        fetch(`${API}/watchlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(watchlistData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                setNewForm(false)
                setWatchlistData((prevState) => {
                    return {
                        id: '',
                        name: '',
                        description: '',
                        favorite: false
                    }
                })
            })
            .catch(err => console.error(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${API}/watchlists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(watchlistData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.error(err))
        
        setEditing(false)
    };

    const handleDelete = () => {

        if(confirm(`Are you sure you want to delete ${watchlistData.name}?`)){
            fetch(`${API}/watchlists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application.json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(res => res.message ? alert(res.message) : alert(res.error))
                .catch(err => console.error(err))
        }
    };

    if(newList) {
        return(
            <>
                <button onClick={() => setNewForm(!newForm)} className='watchlist-new'>{newForm ? 'Undo' : 'Add new'}</button>
                {newForm && 
                    <Form onSubmit={addNewList} className='watchlist'>
                        <header className='watchlist__header'>    
                            <Form.Group controlId='formWatchlistTitle'>
                                <Form.Control
                                    onChange={handleChange}
                                    className='watchlist-form-name '
                                    name='name'
                                    placeholder='watchlist name'
                                    value={watchlistData.name}
                                />
                            </Form.Group>
                            <div className="watchlist__icons">
                                <Button className='watchlist__submit' type='submit'>
                                    <FontAwesomeIcon className='watchlist__icon' icon={editing ? faCircleCheck : faPenToSquare}/>                            
                                </Button>
                            </div>
                        </header>
                        <Form.Group controlId='formWatchlistTextArea'>
                            <Form.Control
                                name='description'
                                className='watchlist-form-textarea watchlist__textarea'
                                onChange={handleChange}
                                as='textarea'
                                placeholder='description'
                                value={watchlistData.description}
                            />
                        </Form.Group>
                    </Form>
                }
            </>
        )
    }

    return (
        <>
        { editing ? 
            <Form onSubmit={handleSubmit} className='watchlist'>
                <header className='watchlist__header'>    
                    <Form.Group controlId='formWatchlistTitle'>
                        <Form.Control
                            onChange={handleChange}
                            className='watchlist-form-name '
                            name='name'
                            placeholder='watchlist name'
                            value={watchlistData.name}
                        />
                    </Form.Group>
                    <div className="watchlist__icons">
                        <Button className='watchlist__submit' type='submit'>
                            <FontAwesomeIcon className='watchlist__icon' icon={editing ? faCircleCheck : faPenToSquare}/>                            
                        </Button>
                        <FontAwesomeIcon onClick={handleDelete} className='watchlist__icon' icon={faTrashCan}/>
                    </div>
                </header>
                <Form.Group controlId='formWatchlistTextArea'>
                    <Form.Control
                        name='description'
                        className='watchlist-form-textarea watchlist__textarea'
                        onChange={handleChange}
                        as='textarea'
                        placeholder='description'
                        value={watchlistData.description}
                    />
                </Form.Group>
            </Form>
            :
            <article className='watchlist'>
                <header className='watchlist__header'>
                    <h2 className='watchlist__name'>{watchlistData.name}</h2>
                    <div className='watchlist__icons'>
                        <FontAwesomeIcon onClick={() => setEditing(!editing)} className='watchlist__icon' icon={faPenToSquare}/>
                        <FontAwesomeIcon onClick={handleDelete} className='watchlist__icon' icon={faTrashCan}/>
                    </div>
                </header>
                <p className='watchlist__textarea'>{watchlistData.description}</p>
            </article>
            }
        </>
        
    );
};

export default Watchlist;