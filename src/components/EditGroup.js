import useApp from "../api/AppContext";
import {fetchEditGroup} from "../api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import {ListItem} from "@mui/material";
import React, {useState} from "react";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import ListItemButton from "@mui/material/ListItemButton";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity3Icon from "@mui/icons-material/Diversity3";

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

const groupSchema = object({
    groupName: string().max(20, 'Max 20 marks').required('Group name is requied'),
    description: string().max(40, 'Max 40 marks').min(10, 'Min 10 marks').required('Description is requied'),
    icon: string().required('Icon is requied'),
});

export default function EditGroup() {
    const {group, setGroup, user, refreshGroups, setRefreshGroups} = useApp();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(groupSchema),
    });

    const saveGroup = async (updateGroupValues) => {
        updateGroupValues.groupId = group._id;
        updateGroupValues.userId = user._id;

        if ((group.groupName === updateGroupValues.groupName) &&
            (group.description === updateGroupValues.description) &&
            (group.icon === updateGroupValues.icon)) {

            setOpen(false);
            return null;
        } else {
            const editedGroup = await fetchEditGroup(updateGroupValues);

            if (editedGroup.message === ('Group editted')) {
                setGroup(editedGroup.group);
                setRefreshGroups(refreshGroups + 1);
                setOpen(false);

            } else {
                console.log('error');
                setOpen(false);
            }
        }
    }

    return (
        <div className="editgroup">
            <ListItem>
                <StyledListItemButton onClick={handleOpen} style={{justifyContent: 'space-between'}}>
                    Edit
                    <ListItemIcon style={{justifyContent: 'flex-end'}}>
                        <EditNoteSharpIcon/>
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
                    <form onSubmit={handleSubmit(saveGroup)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Edit a group
                        </Typography>
                        <br></br>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Group name:
                            </InputLabel>
                            <BootstrapInput
                                name="groupName"
                                defaultValue={group.groupName}
                                id="bootstrap-input"
                                {...register('groupName')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.groupName && <p>{errors.groupName.message}</p>}
                        </h5>

                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Username:
                            </InputLabel>
                            <BootstrapInput
                                name="description"
                                defaultValue={group.description}
                                id="bootstrap-input"
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
                                defaultValue={group.icon}
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
                        <Button variant="contained" type={'submit'}> Save </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}