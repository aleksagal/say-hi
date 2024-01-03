import React, {useEffect} from "react";
import './home.css';
import '../App.css';
import Grid from '@mui/material/Grid';
import LeftBar from "./LeftBar";
import RightSidebar from "./RightSidebar";
import {fetchProfile} from "../api/api";
import useApp from "../api/AppContext";
import {useNavigate} from "react-router-dom";
import MiddleBar from "./MiddleBar";
import {Item} from './styles';
import Box from "@mui/material/Box";

export default function Home() {
    let navigate = useNavigate();
    const { user, setUser } = useApp();

    const getUserData = async () => {
        if (!localStorage.getItem("accessToken")){
            navigate("/login");
        } else {
            const userData = await fetchProfile();
            setUser(userData);
        }
    }

    useEffect(()=>{
        if (Object.keys(user).length === 0){
            getUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={'home-page'}>
            <Box sx={{margin: {xs: 2, sm: 2, md: 2, lg: 4, xl: 4}}}>
            <Grid container spacing={{xs: 2, sm: 2, md: 2, lg: 4, xl: 6}} className={'home'} direction="row" >
                <Grid item xs={12} sm={4} md={3} lg={3} container className={'leftBar'}>
                    <Grid item xs={12}>
                        <Item sx={{padding: {xs: 0, sm: 0, md: 2, lg: 3}}}>
                            <LeftBar />
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} container className={'main'}>
                    <Grid item xs={12} className={'posts'}>
                        <Item sx={{padding: {xs: 0, sm: 0, md: 2, lg: 3}}}>
                            <MiddleBar/>
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} container className={'rightBar'} sx={{direction: {xs: 'columns'}}}>
                    <Grid item xs={12} className={'sidebar-1'}>
                        <Item sx={{padding: {xs: 0, sm: 0, md: 2, lg: 3}}}>
                            <RightSidebar/>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </div>
    );
}