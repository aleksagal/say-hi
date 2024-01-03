import React, {useEffect, useState} from "react";
import List from '@mui/material/List';
import {ListItem} from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../../App.css';
import {fetchGroups} from "../../api/api";
import useApp from "../../api/AppContext";
import {StyledListItemButton} from '../styles';

const iconMapping = {
    EscalatorWarningIcon: <EscalatorWarningIcon/>,
    ConnectWithoutContactIcon: <ConnectWithoutContactIcon/>,
    Diversity3Icon: <Diversity3Icon/>,
};

export default function ShowGroups() {
    const [listGroups, setListGroups] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {setGroup, refreshGroups} = useApp();

    const getGroups = async () => {
        let groups = await fetchGroups();

        if (groups.message === ('Successfully fetched user  groups')) {
            if (Object.keys(groups.userGroups).length === 0) {
                console.log('No groups');
            } else {
                setListGroups(groups.userGroups.reverse());
                setGroup(groups.userGroups[0]);
                setSelectedIndex(groups.userGroups[0]._id);
            }
        } else {
            console.log('Server error');
            return null;
        }
    }

    useEffect(() => {
        if (refreshGroups >= 0) {
            getGroups();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshGroups])

    const handleClick = (event, group) => {
        setGroup(group)
        setSelectedIndex(group._id);
    }

    return (
        <div>
            <h3 className={'main-color font'} style={{justifyContent: 'center', }}> Your community </h3>
            <List component="nav">
                {listGroups?.map((group, index) => {
                    return (
                        <ListItem key={index}>
                            <StyledListItemButton
                                id={group._id}
                                selected={selectedIndex === group._id}
                                onClick={(e) => handleClick(e, group)}
                            >
                                <ListItemIcon>
                                    {iconMapping[group.icon] || <EscalatorWarningIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={group.groupName}/>
                            </StyledListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}