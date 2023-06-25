import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Edit from "./components/Edit"
import { Routes, Route, useNavigate  } from "react-router-dom";
import ReactDOM from 'react-dom';
import Button from "@mui/material/Button";
import React, {useState} from "react";
import { Context } from "./Context";


function App() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");


    return (
        <div className="App">
            <Button variant="contained" type={'button'} style={{background: 'darkslategrey', padding: 10, margin: 10}} onClick={()=> {navigate("/register")}}>Register</Button>
            <Button variant="contained" type={'button'} style={{background: 'darkslategrey', padding: 10, margin: 10}} onClick={()=> {navigate("/login")}}>Login</Button>
            <Button variant="contained" type={'button'} style={{background: 'darkslategrey', padding: 10, margin: 10}} onClick={()=> {navigate("/profile")}}>Profile</Button>
            {/*<div>*/}
            {/*    <Context.Provider value={{ name, setName, username, setUsername }}>*/}
            {/*        <Profile />*/}
            {/*        <Edit />*/}
            {/*    </Context.Provider>*/}
            {/*</div>*/}
            <Context.Provider value={{ name, setName, username, setUsername }}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
            </Context.Provider>

        </div>

    );
}
// profil uzytkownika pobrac dane z serwera zaprezentowac i edit button formulacz do edycji danych uzytkownika, wstrzyknac nowe dane
// contexapi react przeczytac

export default App;
