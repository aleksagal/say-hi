import Button from '@mui/material/Button';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import {  useNavigate  } from "react-router-dom";
import Profile from "./Profile";

export default function Login() {

    let navigate = useNavigate();

    const loginSchema = object({

        username: string().required('Username is requied'),
        password: string().required('Password is requied'),

    })

    const [LoginErrors, setLoginErrors] = useState({});
    const [isLoginSuccess, setIsLoginSuccess] = useState();
    const [LoginSuccess, setLoginSuccess] = useState();
    const {register, handleSubmit} = useForm();

    const executeLogin = async (loginValues) => {

        fetch('http://localhost:3030/login', {
            method: 'POST',
            body: JSON.stringify(loginValues),
            headers: {'Content-Type': 'application/json'},

        }).then(response => response.json())
            .then(jsondata => {
                console.log(jsondata);
                if (jsondata.message === ('User logged in successfully')) {
                    setIsLoginSuccess("Logged in");
                    setLoginSuccess(true);
                    localStorage.setItem("accessToken", jsondata.token);
                } else {
                    setIsLoginSuccess('Invalid password or username');
                }

            })

        // console.log(localStorage.getItem("accessToken"))

    }

    const handleLogin = async (loginValues) => {
        const isLoginValid = await loginSchema.isValid(loginValues, {abortEarly: false});

        if (isLoginValid) {

            setLoginErrors({});
            await executeLogin(loginValues);

        } else {
            loginSchema.validate(loginValues, {abortEarly: false})
                .catch((err) => {

                    let errors = [];
                    err.inner.forEach(error => {
                        errors[error.path] = error.errors;
                    })
                    setLoginErrors(errors);
                })
        }

    }


    return (
        <div>
            <h3 style={{color: 'darkblue'}}>Sign in</h3>
            <hr></hr>
            {LoginSuccess
                ? <div>
                    <h3 style={{color: 'blue'}} >{isLoginSuccess}</h3>
                    <Button variant="contained" type={'button'} onClick={()=> {navigate("/profile")}}>See the profile</Button>

                </div>
                : <form onSubmit={handleSubmit(handleLogin)}>
                    <h3>Username:</h3>
                        <input
                            id={'username'}
                            type='text'
                            placeholder='Enter username'
                            {...register('username')}
                            className='login-username'
                        />
                        <p style={{color: 'red'}} className="error">{LoginErrors.username}</p>


                    <h3>Password:</h3>
                    <input
                        id={'password'}
                        type='password'
                        placeholder='Enter password'
                        {...register('password')}
                        className='login-password'
                    />
                    <p style={{color: 'red'}} className="error">{LoginErrors.password}</p>

                    <br></br>
                    <Button variant="contained" type={'submit'}>Login</Button>
                    <h3 style={{color: 'red'}} >{isLoginSuccess}</h3>
                    <h3>Do you not have an account? <a href="/register">Create an account</a></h3>
                </form>}
        </div>


    )
}