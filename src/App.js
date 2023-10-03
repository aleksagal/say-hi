import './App.css';
import Register from './components/Register';
import Login from "./components/Login";
import RightSidebar from "./components/RightSidebar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import {Routes, Route, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";
import ShowGroups from "./components/ShowGroups";
import CreateGroup from "./components/CreateGroup";
import {AppProvider} from "./api/AppContext";

function App() {
    let navigate = useNavigate();

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
                        <Button variant="contained" type={'button'} onClick={() => {navigate("/register")}}>
                            Register
                        </Button>
                        <Button variant="contained" type={'button'} onClick={() => { navigate("/login")}}>
                            Login
                        </Button>
                        <Button variant="contained" type={'button'} onClick={handleLogOut}>Log out</Button>

                        <Routes>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/rightsidebar" element={<RightSidebar/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/creategroup" element={<CreateGroup/>}/>
                            <Route path="/showgroup" element={<ShowGroups/>}/>
                        </Routes>
                    </div>
                </div>
            </AppProvider>
        </div>
    );
}

export default App;
