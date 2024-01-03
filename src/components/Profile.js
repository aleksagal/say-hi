import React, {useState} from "react";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
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
import {BoxStyle, InputStyle} from './styles';

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
                <Box sx={BoxStyle}>

                    <form onSubmit={handleSubmit(saveProfile)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Edit profile
                        </Typography>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Name:
                            </InputLabel>
                            <InputStyle
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
                            <InputStyle
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