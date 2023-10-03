// import useApp from "../api/AppContext";
import React, {useState} from "react";
// import {useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
// import {fetchEditGroup} from "../api/api";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from '@mui/icons-material/People';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItem} from "@mui/material";

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
    // border: '2px solid #ABC357',
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
                <Box sx={style}>

                </Box>
            </Modal>
        </div>
    );
}