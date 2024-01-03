import React, {useEffect, useState} from "react";
import '../../App.css';
import {fetchPosts} from "../../api/api";
import useApp from "../../api/AppContext";
import {ListItem} from "@mui/material";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const iconMapping = {
    EscalatorWarningIcon: <EscalatorWarningIcon/>,
    ConnectWithoutContactIcon: <ConnectWithoutContactIcon/>,
    Diversity3Icon: <Diversity3Icon/>,
};

export default function Posts() {
    const {group, post} = useApp();
    const [listPosts, setListPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const [totalPages, setTotalPages] = useState();
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPosts = async () => {
        if (group._id !== undefined) {
            let posts = await fetchPosts(group._id, 3);
            if (posts.message === ('Posts fetched successfully')) {
                setListPost(posts.post.reverse());
                setTotalPages(Math.ceil(posts.post.length / postsPerPage));
            } else {
                console.log('No new posts')
            }
        }
    }

    const currentPosts = listPosts?.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group, post])

    return (
        <div>
            <br></br>
            <h2 className={'main-color font nonemargin'}> Posts </h2>
            <Box sx={{pb: 7}}>
                <CssBaseline/>
                <List>
                    {currentPosts?.map((post) => {
                        return (
                            <ListItem key={post._id}>
                                <ListItemAvatar>
                                    <p style={{color: '#7E6F88'}}>
                                        {group ? iconMapping[group.icon] : <EscalatorWarningIcon/>}
                                    </p>
                                </ListItemAvatar>
                                <ListItemText primary={post.title} secondary={post.content}/>
                                <div className={'option'}>
                                    <Button
                                        id="demo-positioned-button"
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon/>
                                    </Button>
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Stack spacing={2} className={'pagination'}>
                <Pagination count={totalPages} onChange={handlePageChange}/>
            </Stack>
        </div>
    )
}