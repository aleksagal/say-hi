import './App.css';
import Register from './components/Register';
import Login from "./components/Login";
import RightSidebar from "./components/RightSidebar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";
import ShowGroups from "./components/ShowGroups";
import CreateGroup from "./components/CreateGroup";
import {AppProvider} from "./api/AppContext";
import LogoutIcon from '@mui/icons-material/Logout';
import Camera from "./components/Camera";

function App() {
    let navigate = useNavigate();
    let location = useLocation();
    //Normally, revoke token call
    const handleLogOut = async () => {
            localStorage.clear();
            navigate("/login");
    }

    return (
        <div>
            <AppProvider>
                <div className="App">
                    <div>
                        {location.pathname === '/home' && (
                            <Button
                                variant="contained"
                                type={'button'}
                                onClick={handleLogOut}
                                startIcon={<LogoutIcon />}
                                className={'logOut'}
                                sx={{
                                    backgroundColor: '#ABC357',
                                    color: 'darkslategrey',
                                    '&:hover': {
                                        backgroundColor: '#CEBCD2'
                                    },
                                    float: 'right',
                                    marginRight: '1%',
                                }}
                            >
                                Log out
                            </Button>
                        )}

                        <Routes>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/rightsidebar" element={<RightSidebar/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/creategroup" element={<CreateGroup/>}/>
                            <Route path="/showgroup" element={<ShowGroups/>}/>
                            <Route path="/camera" element={<Camera/>}/>
                        </Routes>
                    </div>
                </div>
            </AppProvider>
        </div>
    );
}

export default App;
