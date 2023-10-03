import React, {useState} from "react";
import '../App.css';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {createNewPost} from "../api/api";
import useApp from "../api/AppContext";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";

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

const postSchema = object({
    title: string().max(20, 'Max 20 marks').required('Title is requied'),
    content: string().max(40, 'Max 40 marks').min(10, 'Min 10 marks').required('Content is requied'),
});

export default function CreatePost() {
    const [openModal, setOpenModal] = useState(false);
    const {group} = useApp();
    const handleOpen = () => {
        setOpenModal(true);
        reset();
    }
    const handleClose = () => {
        setOpenModal(false);
    }
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(postSchema),
    });

    const createPost = async (postValues) => {
        postValues.groupId = group._id;
        const isPostCreated = await createNewPost(postValues);
        if (isPostCreated.message === ('Post successfully created')) {
            console.log('Your post is created');
            setOpenModal(false);

        } else {
            console.log(isPostCreated.message);
            setOpenModal(false);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}> <AddIcon fontSize={"small"}/> Add new post</Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(createPost)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Create a post
                        </Typography>
                        <br/>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Title:
                            </InputLabel>
                            <BootstrapInput
                                control={control}
                                {...register('title')}
                            />
                        </FormControl>
                        <h5 className="error-server error-color font">
                            {errors.title && <p>{errors.title.message}</p>}
                        </h5>

                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Content:
                            </InputLabel>
                            <BootstrapInput
                                control={control}
                                {...register('content')}
                            />
                        </FormControl>
                        < br/>
                        <h5 className="error-server error-color font">
                            {errors.content && <p>{errors.content.message}</p>}
                        </h5>
                        <Button variant="contained" type={'submit'}> Add </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}