import React, {useEffect} from "react";
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import './home.css';
import '../App.css';
import Grid from '@mui/material/Grid';
import LeftBar from "./LeftBar";
import RightSidebar from "./RightSidebar";
import {fetchProfile} from "../api/api";
import useApp from "../api/AppContext";
import {useNavigate} from "react-router-dom";
import MiddleBar from "./MiddleBar";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: 'white',
    borderRadius: '0.5rem'
}));

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
            <Grid container spacing={3} className={'home'}>
                <Grid item xs={3} container className={'menu'}>
                    <Grid item xs={12}>
                        <Item>
                            <LeftBar />
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={6} container className={'main'}>
                    <Grid item xs={12} className={'posts'}>
                        <Item>
                            <MiddleBar/>
                        </Item>
                    </Grid>
                </Grid>
                <Grid item xs={3} container className={'sidebar'}>
                    <Grid item xs={12} className={'sidebar-1'}>
                        <Item>
                            <RightSidebar/>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}