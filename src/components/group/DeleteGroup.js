import useApp from "../../api/AppContext";
import React, {useState} from "react";
import Button from '@mui/material/Button';
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListItem} from "@mui/material";
import {deleteGroup} from "../../api/api";
import {BoxStyle, StyledListItemButton} from '../styles';

export default function DeleteGroup() {
    const {group, refreshGroups, setRefreshGroups} = useApp();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const removeGroup = async () => {
        const groupId = group._id;
        const deletedGroup = await deleteGroup(groupId);
        if (deletedGroup.message === ('Group deleted')) {
            setRefreshGroups(refreshGroups + 1);
            setOpen(false);
        } else {
            console.log('error');
            setOpen(false);
        }
    }

    return (
        <div className="deletegroup">
            <ListItem>
                <StyledListItemButton onClick={handleOpen} style={{justifyContent: 'space-between'}}>
                    Delete
                    <ListItemIcon style={{justifyContent: 'flex-end'}}>
                        <DeleteIcon/>
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
                    <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                        Are you sure?
                    </Typography>
                    <br/>
                    <Button variant="contained" onClick={removeGroup}> YES </Button>
                    <Button variant="contained" onClick={handleClose}> NO </Button>
                </Box>
            </Modal>
        </div>
    );
}