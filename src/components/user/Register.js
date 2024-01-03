import Button from '@mui/material/Button';
import {FormControl, FormHelperText} from "@mui/material";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import banner from '../../Banner.png';
import logo from '../../logo_app.png'
import './register-login.css';
import {fetchRegister} from "../../api/api";
import LoginIcon from '@mui/icons-material/Login';
import Grid from "@mui/material/Grid";
import {RegisterLoginBox, RegisterLoginPaper, RightUpButton} from "../styles";

const userSchema = object({
    name: string().max(15, 'Max 15 marks').required('Name is requied'),
    username: string().max(15, 'Max 15 marks').required('Username is requied'),
    password: string().min(6, 'Min 6 marks').max(15, 'Max 15 marks').required('Password is requied'),
    check: boolean().oneOf([true], "You must accept the terms and conditions"),
})

export default function Register() {
    let navigate = useNavigate();
    const [registerErrors, setRegisterErrors] = useState({});
    const {register, handleSubmit} = useForm();
    const [isRegisterSuccess, setIsRegisterSuccess] = useState();
    const [registerSuccess, setRegisterSuccess] = useState();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const handleRegister = async (registerValues) => {
        const isFormValid = await userSchema.isValid(registerValues, {abortEarly: false})

        if (isFormValid) {
            setRegisterErrors({});
            await executeRegister(registerValues);

        } else {
            userSchema.validate(registerValues, {abortEarly: false})
                .catch((err) => {

                    let errors = [];
                    err.inner.forEach(error => {
                        errors[error.path] = error.errors;
                    })
                    setRegisterErrors(errors);
                })
        }
    }

    const executeRegister = async (registerValues) => {
        const register = await fetchRegister(registerValues);

        if (register.message === ('User registered successfully')) {
            setIsRegisterSuccess('Your account is created');
            setRegisterSuccess(true);
        } else {
            setIsRegisterSuccess(register.message);
        }
    }

    return (
        <div className={'register-page'}>
            <RegisterLoginBox>
                <RegisterLoginPaper sx={{margin: {xs: 4, sm: 6, md: 2}, padding: {xs: 4, sm: 6, md: 2}}}>
                    <Grid container
                          rowSpacing={1}
                          columnSpacing={{xs: 0, sm: 0, md: 0}}
                          columns={{xs: 8, sm: 8, md: 16}}
                          style={{padding: '2'}}
                    >
                        <Grid item xs={8} style={{padding: '1% 5%'}}>
                            <img src={logo} alt={'logo'} className={'logo'}/>
                            <br></br>
                            <br></br>
                            <div className={'form-area'}>
                                <h1 className={'main-color font wordspacing nonemargin'}>
                                    Create an account
                                </h1>
                                <h4 className={'main-color font wordspacing nonemargin'}>
                                    Let’s get started for <span className={'second-color'}>free</span>.
                                </h4>
                                <br></br>
                                {registerSuccess ?
                                    <div className={'form-area-register-success'}>
                                        <h4 className={'second-color'}>Your account is created successfully.</h4>
                                    </div>
                                    : <form onSubmit={handleSubmit(handleRegister)} className='form'>
                                        <h4 className={'main-color font marginbottom margintop'}>Name:</h4>
                                        <TextField
                                            sx={{width: '100%'}}
                                            id="outlined-basic1"
                                            label="Enter name"
                                            variant="outlined"
                                            type='text'
                                            error={!!registerErrors.name}
                                            helperText={registerErrors ? registerErrors.name : null}
                                            {...register('name')}
                                        />
                                        <h4 className={'main-color font marginbottom margintop'}>Username:</h4>
                                        <TextField
                                            sx={{width: '100%'}}
                                            id="outlined-basic2"
                                            error={!!registerErrors.username}
                                            helperText={registerErrors ? registerErrors.username : null}
                                            label="Enter username"
                                            variant="outlined"
                                            type='text'
                                            {...register('username')}
                                        />
                                        <h4 className={'main-color font marginbottom margintop'}>Password:</h4>
                                        <FormControl sx={{width: '100%'}} variant="outlined" onChange={handleChange}>
                                            <TextField
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                error={!!registerErrors.password}
                                                id="outlined-error-helper-text"
                                                label="Enter password"
                                                helperText={registerErrors ? registerErrors.password : null}
                                                value={password}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                className={'button-eye'}
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                {...register('password')}
                                            />
                                        </FormControl>
                                        <PasswordStrengthBar password={password}/>
                                        <FormControlLabel control={<Checkbox defaultChecked color="success"/>}
                                                          label="I agree to all term"
                                                          className={'title-padding'}
                                                          {...register('check')} sx={{color: 'grey'}}
                                        />
                                        <FormHelperText style={{color: '#d32f2f'}}>
                                            {registerErrors.check}
                                        </FormHelperText>
                                        <div className={'submit'}>
                                            <Button
                                                variant="contained"
                                                type={'submit'}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    margin: 'auto',
                                                    width: 'fit-content',
                                                }}
                                            >
                                                Create an account
                                            </Button>
                                            <h5 className={'main-color font nonemargin'}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    margin: 'auto',
                                                    width: 'fit-content'
                                                }}
                                            >
                                                Do you already have an account?&nbsp;
                                                <a href="/login" className={'link-color title-padding'}>
                                                    Log in <CallMadeIcon fontSize={"small"}/>
                                                </a>
                                            </h5>
                                            <h5 className="error-server error-color">{isRegisterSuccess}</h5>
                                        </div>
                                    </form>}
                            </div>
                            <RightUpButton
                                variant="contained"
                                startIcon={<LoginIcon/>}
                                onClick={() => {
                                    navigate("/login")
                                }}
                            >
                                Log in
                            </RightUpButton>
                        </Grid>
                        <Grid item xs={8} style={{padding: '0'}} sx={{display: {xs: 'none', sm: 'none', md: 'flex'}}}>
                            <img src={banner} alt={'banner'} style={{width: '100%', height: 'auto'}}/>
                        </Grid>
                    </Grid>
                </RegisterLoginPaper>
            </RegisterLoginBox>
        </div>
    )
}

