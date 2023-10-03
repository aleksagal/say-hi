import Button from '@mui/material/Button';
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {useNavigate} from "react-router-dom";
import banner from "./Banner.png";
import './register-login.css';
import '../App.css';
import logo from './logo_app.png'
import WavingHandIcon from '@mui/icons-material/WavingHand';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {FormControl} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import useApp from "../api/AppContext";
import {fetchProfile, fetchLogin} from "../api/api";
import {FormHelperText} from "@mui/material";

const loginSchema = object({
    username: string().required('Username is requied'),
    password: string().required('Password is requied'),
})

export default function Login() {
    let navigate = useNavigate();
    const [loginErrors, setLoginErrors] = useState({});
    const [isLoginSuccess, setIsLoginSuccess] = useState();
    const {register, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const {setUser} = useApp();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (loginValues) => {
        const isLoginValid = await loginSchema.isValid(loginValues, {abortEarly: false});

        if (isLoginValid) {

            setLoginErrors({});
            setIsLoginSuccess();
            await executeLogin(loginValues);

        } else {
            loginSchema.validate(loginValues, {abortEarly: false})
                .catch((err) => {

                    let errors = [];
                    err.inner.forEach(error => {
                        errors[error.path] = error.errors;
                    })
                    setIsLoginSuccess();
                    setLoginErrors(errors);
                })
        }
    }

    const executeLogin = async (loginValues) => {
        const login = await fetchLogin(loginValues);

        if (login.message === ('User logged in successfully')) {
            localStorage.setItem("accessToken", login.token);
            const profile = await fetchProfile();
            setUser(profile);
            navigate("/home");
        } else {
            setIsLoginSuccess('Invalid password or username');
        }
    }

    return (
        <div className={'login-page'}>
            <div className={'container'}>

                <div className={'logo-area'}>
                    <img src={logo} alt={'logo'} className={'logo'}/>
                </div>

                <div className={'form-area'}>
                    <h1 className={'main-color title-padding font wordspacing'}>Login</h1>
                    <h4 className={'main-color title-padding font wordspacing marginbottom'}>
                        Hi, welcome back <span className={'second-color'}><WavingHandIcon/></span>.</h4>
                    <br></br>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className={'inputs'}>
                            <h4 className={'main-color font marginbottom'}>Username:</h4>
                            <TextField
                                sx={{width: '100%'}}
                                id="outlined-basic"
                                label="Enter username"
                                variant="outlined"
                                type='text'
                                error={!!loginErrors.username || !!isLoginSuccess}
                                helperText={loginErrors ? loginErrors.username : null}
                                {...register('username')}
                            />

                            <h4 className={'main-color font marginbottom'}>Password:</h4>
                            <FormControl sx={{width: '100%'}} variant="outlined"
                                         error={!!loginErrors.password || !!isLoginSuccess}>
                                <TextField
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!loginErrors.password || !!isLoginSuccess}
                                    id="outlined-error-helper-text"
                                    label="Enter password"
                                    helperText={loginErrors ? loginErrors.password : null}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
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
                                <FormHelperText style={{color: 'palette.error.dark'}}>{isLoginSuccess}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={'submit'}>
                            <br></br>
                            <Button variant="contained" type={'submit'}>Login</Button>
                            <h5 className={'main-color font title-padding'}>Do you not have an account?&nbsp;
                                <a href="/register" className={'success-color marginbottom'}>
                                    Create an account <CallMadeIcon fontSize={"small"}/>
                                </a>
                            </h5>
                        </div>
                    </form>
                </div>

                <div className={'button-area'}>
                    <Button variant="contained" type={'button'} onClick={() => {
                        navigate("/register")
                    }}>
                        Sign up
                    </Button>
                </div>

                <div className={'picture-area'}>
                    <img src={banner} alt={'banner'}/>
                </div>
            </div>
        </div>
    )
}