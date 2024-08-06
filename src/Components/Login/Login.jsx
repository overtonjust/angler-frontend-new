// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.scss'

const Login = () => {
    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;

    const handleChange = (e) => {
        setLogin((prevState) => {
            return  {...prevState, [e.target.name]: e.target.value}
        })
    };

    const handlePassToggle = (e) => {
        setShowPass(!showPass)
    };

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login),
            credentials: 'include'
        })
            .then(res => {
                console.log(res)
                res.ok ? navigate('/home') : res.json().then(res => alert(res.error))
            })
            .catch(err => console.error(err))
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if(res.message) {
                    alert(res.message)
                    navigate('/home')
                } else {
                    alert(res.error)
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <Form className='login' onSubmit={signUp ? handleSignUp : handleLogin}>
            {signUp && 
                <Form.Group controlId='formEmail'>
                    <InputGroup className='login__input-box' >
                        <Form.Control name='email' className='login__input' type='email' placeholder='Email' value={login.email} onChange={handleChange} required  />          
                        <InputGroup.Text className='login__icon-box'>
                            <FontAwesomeIcon className='login__icon' icon={faEnvelope}/>    
                        </InputGroup.Text>
                    </InputGroup> 
                </Form.Group>
            }
            <Form.Group controlId='formUsername' >
                <InputGroup className='login__input-box' >
                    <Form.Control name='username' className='login__input' type='text' placeholder='Username' value={login.username} onChange={handleChange} required />          
                    <InputGroup.Text className='login__icon-box'>
                        <FontAwesomeIcon className='login__icon' icon={faUser}/>    
                    </InputGroup.Text>
                </InputGroup> 
            </Form.Group>
            <Form.Group  controlId='formPassword'>
                <InputGroup className='login__input-box'>
                    <Form.Control name='password' className='login__input' type={showPass ? 'text' : 'password'} placeholder='Password'  value={login.password} onChange={handleChange} required/>
                    <InputGroup.Text className='login__icon-box'>
                        <FontAwesomeIcon onClick={handlePassToggle} className='login__icon' icon={showPass ? faEyeSlash : faEye}/>
                    </InputGroup.Text>
                    <InputGroup.Text className='login__icon-box'>
                        <FontAwesomeIcon className='login__icon' icon={faLock}/>
                    </InputGroup.Text>
                </InputGroup>
                <Form.Text className='login__text'>We'll never share your password with anyone else.</Form.Text>
            </Form.Group>
            <InputGroup className='login__submit-box'>
                <Button className='login__submit' type='submit'>
                {signUp ? 'Sign up' : 'Login'}
                </Button>
                {signUp ?                     
                
                    <Form.Text className='login__text clickable' onClick={() => setSignUp(false)}>Already signed up? Login here!</Form.Text>
                    :
                    <Form.Text className='login__text clickable' onClick={() => setSignUp(true)}>No login? Sign up here!</Form.Text>
                }
            </InputGroup>
        </Form>
    );
};

export default Login;