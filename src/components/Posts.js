import React, {useEffect, useState} from "react";
import '../App.css';
import {fetchPosts} from "../api/api";
import useApp from "../api/AppContext";
import {ListItem} from "@mui/material";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const iconMapping = {
    EscalatorWarningIcon: <EscalatorWarningIcon/>,
    ConnectWithoutContactIcon: <ConnectWithoutContactIcon/>,
    Diversity3Icon: <Diversity3Icon/>,
};

export default function Posts() {
    const {group} = useApp();
    const [listPosts, setListPots] = useState()

    const getPosts = async () => {
        if (group._id !== undefined) {
            let posts = await fetchPosts(group._id);
            if (posts.message === ('Posts fetched successfully')) {
                setListPots(posts.post.reverse());
            } else {
                console.log('No new posts')
            }
        }
    }

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group])

    return (
        <div>
            <br></br>
            <h3 className={'main-color font'}> Posts </h3>
            <Box sx={{pb: 7}}>
                <CssBaseline/>
                <List>
                    {listPosts?.map((post, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <p style={{color: '#7E6F88', margin: '0'}}>
                                        {group ? iconMapping[group.icon] : <EscalatorWarningIcon/>}
                                    </p>
                                </ListItemAvatar>
                                <ListItemText primary={post.title} secondary={post.content}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </div>
    )
}