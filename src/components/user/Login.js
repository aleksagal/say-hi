import Button from '@mui/material/Button';
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import banner from "../../Banner.png";
import './register-login.css';
import '../../App.css';
import logo from '../../logo_app.png'
import WavingHandIcon from '@mui/icons-material/WavingHand';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {FormControl} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import useApp from "../../api/AppContext";
import {fetchProfile, fetchLogin} from "../../api/api";
import {FormHelperText} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {RegisterLoginBox, RegisterLoginPaper, RightUpButton} from "../styles";

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
            <RegisterLoginBox>
                <RegisterLoginPaper sx={{margin: {xs: 4, sm: 6, md: 2}, padding: {xs: 4, sm: 6, md: 2},}}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 0, sm: 0, md: 0}}
                          columns={{xs: 8, sm: 8, md: 16}} style={{padding: '2'}}>
                        <Grid item xs={8} style={{padding: '5%'}}>
                            <img src={logo} alt={'logo'} className={'logo'}/>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className={'form-area'}>
                                <h1 className={'main-color font wordspacing nonemargin'}>
                                    Login
                                </h1>
                                <h4 className={'main-color font wordspacing nonemargin'}>
                                    Hi, welcome back <span className={'second-color'}><WavingHandIcon/></span>.
                                </h4>
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
                                            <FormHelperText
                                                style={{color: 'palette.error.dark'}}>{isLoginSuccess}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className={'submit'}>
                                        <br></br>
                                        <Button
                                            variant="contained"
                                            type={'submit'}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: 'auto',
                                                width: 'fit-content',
                                            }}>
                                            Login
                                        </Button>
                                        <h5 className={'main-color font nonemargin'}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: 'auto',
                                                width: 'fit-content'
                                            }}>
                                            Do you not have an account?&nbsp;
                                            <a href="/register" className={'success-color marginbottom'}>
                                                Create an account <CallMadeIcon fontSize={"small"}/>
                                            </a>
                                        </h5>
                                    </div>
                                </form>
                            </div>
                            <RightUpButton
                                variant="contained"
                                startIcon={<PersonIcon/>}
                                    onClick={() => {
                                        navigate("/register")
                                    }}>
                                Sign up
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