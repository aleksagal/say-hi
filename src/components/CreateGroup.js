import React, {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import '../App.css';
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {createNewGroup} from "../api/api";
import useApp from "../api/AppContext";
import {BoxStyle, InputStyle} from './styles';

const groupSchema = object({
    groupName: string().max(20, 'Max 20 marks').required('Group name is requied'),
    description: string().max(40, 'Max 40 marks').min(10, 'Min 10 marks').required('Description is requied'),
    icon: string().required('Icon is requied'),
});

export default function CreateGroup() {
    const [openModal, setOpenModal] = useState(false);
    const [isCreateGroupSuccess, setIsCreateGroupSuccess] = useState();
    const [isCreateGroupNotSuccess, setIsCreateGroupNotSuccess] = useState();
    const {refreshGroups, setRefreshGroups} = useApp();
    const handleOpen = () => {
        setOpenModal(true);
        setIsCreateGroupSuccess();
        setIsCreateGroupNotSuccess();
        reset();
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const {register, handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(groupSchema),
    });

    const createGroup = async (groupValues) => {
        const isGroupCreated = await createNewGroup(groupValues);
        if (isGroupCreated.message === ('Group successfully created')) {
            setIsCreateGroupNotSuccess();
            setIsCreateGroupSuccess('Your group is created');
            setOpenModal(false);
            setRefreshGroups(refreshGroups + 1);
        } else {
            setIsCreateGroupSuccess();
            setIsCreateGroupNotSuccess(isGroupCreated.message);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>Add new group</Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>
                    <form onSubmit={handleSubmit(createGroup)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Create a group
                        </Typography>
                        <br/>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Group name:
                            </InputLabel>
                            <InputStyle
                                control={control}
                                {...register('groupName')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.groupName && <p>{errors.groupName.message}</p>}
                        </h5>

                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Description:
                            </InputLabel>
                            <InputStyle
                                control={control}
                                {...register('description')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.description && <p>{errors.description.message}</p>}
                        </h5>
                        <FormControl name="icon">
                            <RadioGroup
                                row
                                name="row-radio-buttons-group"
                                className={'second-color'}
                            >
                                <FormControlLabel
                                    value="EscalatorWarningIcon"
                                    control={<Radio/>}
                                    label={<EscalatorWarningIcon/>}
                                    className={'main-color'}
                                    {...register('icon', {required: true})}
                                />
                                <FormControlLabel
                                    value="ConnectWithoutContactIcon"
                                    control={<Radio/>}
                                    label={<ConnectWithoutContactIcon/>}
                                    className={'main-color'}
                                    {...register('icon', {required: true})}
                                />
                                <FormControlLabel
                                    value="Diversity3Icon"
                                    control={<Radio/>}
                                    label={<Diversity3Icon/>}
                                    className={'main-color'}
                                    {...register('icon', {required: true})}
                                />
                            </RadioGroup>
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.icon && <p>{errors.icon.message}</p>}
                        </h5>
                        <h5 className="error-server error-color font">
                            {isCreateGroupNotSuccess}
                        </h5>
                        <Button variant="contained" type={'submit'}> Save</Button>
                        <h5 className="error-server error-color font">
                            {isCreateGroupSuccess}
                        </h5>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}