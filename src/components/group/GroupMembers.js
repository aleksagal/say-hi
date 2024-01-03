import React, {useState} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from '@mui/icons-material/People';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {ListItem} from "@mui/material";
import {BoxStyle, StyledListItemButton} from '../styles';

export default function GroupMembers() { //TODO component in progress
    // const {group, setGroup} = useApp();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const showMembers = async () => {
    //
    // }

    return (
        <div className="members">
            <ListItem>
                <StyledListItemButton onClick={handleOpen} style={{justifyContent: 'space-between'}}>
                    Members
                    <ListItemIcon style={{justifyContent: 'flex-end'}}>
                        <PeopleIcon />
                    </ListItemIcon>
                </StyledListItemButton>
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>

                </Box>
            </Modal>
        </div>
    );
}