import React, { useEffect, useContext } from "react";
import ReactDOM from 'react-dom';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { Context } from "../Context";


export default function Profile() {
    let navigate = useNavigate();

    const { name, setName } = useContext(Context);
    const { username, setUsername } = useContext(Context);


    const getProfile = async () => {

        let profile = await fetch("http://localhost:3030/show/me", {
            method: 'GET',
            headers: {
                authorization: "Bearer " + localStorage.getItem("accessToken")
            },
        });

        profile = await profile.json();

        setName(profile.name);
        setUsername(profile.username);

    }

    useEffect(() => {
        getProfile();
    },)

    return (
        <div className="Profile">

            <p>Profile</p>
            <h3>Name:</h3>
            <label>{name}</label>
            <h3>Username:</h3>
            <label>{username}</label>
            <br></br>
            <Button variant="contained" type={'button'} onClick={()=>navigate("/edit")}>Edit</Button>


        </div>
    );
}