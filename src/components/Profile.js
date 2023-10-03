import React, {useState} from "react";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Modal from "@mui/material/Modal";
import useApp from "../api/AppContext";
import {fetchEditProfile} from "../api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {yupResolver} from "@hookform/resolvers/yup";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import IconButton from "@mui/material/IconButton";

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

const BootstrapInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#F4F2DC',
        border: '1px solid',
        borderColor: '#CEBCD2',
        boxShadow: `${alpha(theme.palette.error.dark, 0.10)} 0 0 0 0.2rem`,
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const editSchema = object({
    name: string().max(15, 'Max 15 marks').required('Name is requied'),
    username: string().max(15, 'Max 15 marks').required('Username is requied'),
});

export default function Profile() {
    const {user, setUser} = useApp();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(editSchema),
    });

    const saveProfile = async (updateProfileValues) => {
        if ((user.name === updateProfileValues.name) && (user.username === updateProfileValues.username)) {
            setOpen(false);
            return null;
        } else {
            const editProfile = await fetchEditProfile(updateProfileValues);
            if (editProfile.message === ('User editted')) {
                setUser(editProfile.user);
                setOpen(false);
            } else {
                console.log('error');
                setOpen(false);
            }
        }
    }

    return (
        <div className="profile">
            <IconButton onClick={handleOpen}> <PersonSharpIcon/> </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(saveProfile)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Edit profile
                        </Typography>
                        <br></br>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Name:
                            </InputLabel>
                            <BootstrapInput
                                name="name"
                                defaultValue={user.name}
                                id="bootstrap-input"
                                {...register('name')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.name && <p>{errors.name.message}</p>}
                        </h5>

                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Username:
                            </InputLabel>
                            <BootstrapInput
                                name="username"
                                defaultValue={user.username}
                                id="bootstrap-input"
                                {...register('username')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.username && <p>{errors.username.message}</p>}
                        </h5>
                        <Button variant="contained" type={'submit'}> Save</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}