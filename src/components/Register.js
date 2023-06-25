import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CallMadeIcon from '@mui/icons-material/CallMade';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {boolean, object, string} from "yup";
import PasswordStrengthBar from 'react-password-strength-bar';
import banner from './Banner.png';
import logo from './logo_app.png'
import './register-login.css';
import {FormControl} from "@mui/material";
import {grey} from "@mui/material/colors";



const userSchema = object({

    name: string().max(15, 'Max 15 marks').required('Name is requied'),
    username: string().max(15, 'Max 15 marks').required('Username is requied'),
    password: string().min(6).max(10).required('Password is requied'),
    check: boolean().oneOf([true], "You must accept the terms and conditions"),

})

export default function Register() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    let navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const {register, handleSubmit} = useForm();

    const [isRegisterSuccess, setIsRegisterSuccess] = useState();
    const [RegisterSuccess, setRegisterSuccess] = useState(false);
    const [password, setPassword] = useState();


    const executeRegister = async (formValues) => {

        fetch('http://localhost:3030/register', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {'Content-Type': 'application/json'},

        }).then(response => response.json())
            .then(jsondata => {

                if (jsondata.message === ('User registered successfully')) {
                    setIsRegisterSuccess('Your account is created');
                    setRegisterSuccess(true);
                } else {
                    setIsRegisterSuccess(jsondata.message);
                }

            })

    }


    const handleRegister = async (formValues) => {

        const isFormValid = await userSchema.isValid(formValues, {abortEarly: false})

        if (isFormValid) {
            setFormErrors({});
            await executeRegister(formValues);

        } else {
            userSchema.validate(formValues, {abortEarly: false})
                .catch((err) => {

                    let errors = [];
                    err.inner.forEach(error => {
                        errors[error.path] = error.errors;
                    })
                    setFormErrors(errors);
                })

        }
    }


    return (
        <div className={'register-page'}>
            <Box sx={{width: '80%', display: 'grid', margin: 'auto'}}>
                <img src={logo} alt={'logo'} className={'logo'} style={{alignContent: "start"}}/>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      style={{background: 'white'}}
                >
                    <Grid item xs={5}>
                        <div className={'form'}>


                            <h1 style={{color: "darkslategrey", paddingBottom: "0vh", marginBottom: "0vh"}}>Create an account</h1>
                            <h3 style={{color: "darkslategrey", paddingTop: "0vh", marginTop: "0.3vh", marginBottom: "4vh", fontFamily: "Lato"}}>
                                Let’s get started for <span style={{color: '#ABC357'}}>free</span>.</h3>

                            {RegisterSuccess
                                ? <div>
                                    <h3 style={{color: 'blue'}} className="error-serwer">{isRegisterSuccess}</h3>
                                    <Button variant="contained" type={'button'} style={{color: '#ABC357'}}
                                            onClick={() => {
                                                navigate("/login")
                                            }}>Login</Button>
                                </div>
                                : <form onSubmit={handleSubmit(handleRegister)} className='form'>
                                    <h3 style={{color: "darkslategrey", fontFamily: 'Lato Black'}}>Name:</h3>

                                    {formErrors.name
                                        ? <TextField
                                            sx={{ width: '55ch' }}
                                            error
                                            id="outlined-error-helper-text"
                                            label="Error"
                                            defaultValue="name"
                                            helperText={formErrors.name}
                                        />
                                        : <TextField
                                            sx={{ width: '55ch' }}
                                            id="outlined-basic"
                                            label="Enter name"
                                            variant="outlined"
                                            type='text'
                                            {...register('name')}
                                        />
                                    }


                                    <h3 style={{color: "darkslategrey", fontFamily: 'Lato Black'}}>Username:</h3>

                                    {formErrors.username
                                        ? <TextField
                                            sx={{ width: '55ch' }}
                                            error
                                            id="outlined-error-helper-text"
                                            label="Error"
                                            defaultValue="username"
                                            helperText={formErrors.username}
                                        />
                                        : <TextField
                                            sx={{ width: '55ch' }}
                                            id="outlined-basic"
                                            label="Enter username"
                                            variant="outlined"
                                            type='text'
                                            {...register('username')}
                                        />
                                    }


                                    {/*<input*/}
                                    {/*    id={'username'}*/}
                                    {/*    type='text'*/}
                                    {/*    placeholder='Enter username'*/}
                                    {/*    className='contact-username'*/}
                                    {/*    {...register('username')}*/}
                                    {/*/>*/}
                                    {/*<p style={{color: 'red'}} className="error">{formErrors.username}</p>*/}


                                    <h3 style={{color: "darkslategrey", fontFamily: 'Lato Black'}}>Password:</h3>

                                    <FormControl sx={{ width: '55ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password" style={{color: "darkslategrey", alignItems: "flex-start"}}>Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            label="Enter password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        label="Enter password"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            {...register('password')}
                                        />
                                    </FormControl>

                                    <PasswordStrengthBar style={{width: '55ch'}} password={password}/>

                                    {/*<input id={'check'} type="checkbox"*/}
                                    {/*       className='contact-check' {...register('check')}/>*/}
                                    {/*<label>I agree to all term </label>*/}

                                    <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="I agree to all term"
                                                      {...register('check')} sx={{color: 'grey'}}/>

                                    <p style={{color: 'red'}} className="error">{formErrors.check}</p>
                                    <br></br>
                                    <div className='bottomform'>
                                    <Button variant="contained" type={'submit'}
                                            style={{background: '#ABC357', padding: 10, width: '33ch' }}>Create an account</Button>
                                    <p style={{color: 'red'}} className="error-serwer">{isRegisterSuccess}</p>
                                    <h4 style={{color: "darkslategrey", fontFamily: 'Lato Black'}}>Already have an account? <a href="/login" style={{color: '#5BB0D9'}}>Log in<CallMadeIcon
                                        fontSize={"small"}/></a></h4>
                                </div>
                                </form>}

                        </div>
                    </Grid>
                <Grid item xs={4}>
                <div className={'banner'}>

                    <img src={banner} alt={'banner'}/>

                </div>
                </Grid>
            </Grid>
            </Box>
        </div>
    );
}


