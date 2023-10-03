import useApp from "../api/AppContext";
import React, {useState} from "react";
import Button from '@mui/material/Button';
import ListItemIcon from "@mui/material/ListItemIcon";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import {styled} from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItem} from "@mui/material";
import {deleteGroup} from "../api/api";

const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
    '&&.Mui-selected': {
        backgroundColor: '#F4F2DC',
        borderRadius: '0.4rem',
        color: '#1A2027',
        '&:hover': {
            backgroundColor: '#CEBCD2',
            borderRadius: '0.4rem',
        },
    },
    '&:hover': {
        backgroundColor: '#CEBCD2',
        borderRadius: '0.4rem',
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    background: 'linear-gradient(225deg, #F4F2DC, #D1C1D7)',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
    'button': {
        background: 'linear-gradient(193deg, #817793 34.61%, #A55F55 100%)',
        padding: '1vh',
        margin: '1vh',
        width: '20vh',
        color: '#F4F2DC',
    },
    'button: hover': {
        backgroundColor: '#CEBCD2',
        padding: '1vh',
        margin: '1vh',
        width: '20vh',
        color: '#F4F2DC',
    },
    'form': {
        textAlign: 'center',
    }
};

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
                <Box sx={style}>
                    <h5 style={{justifyContent: 'center'}}>Are you sure?</h5>
                    <Button variant="contained" onClick={removeGroup}> YES </Button>
                    <Button variant="contained" onClick={handleClose}> NO </Button>
                </Box>
            </Modal>
        </div>
    );
}