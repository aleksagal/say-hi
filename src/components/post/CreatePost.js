import React, {useState} from "react";
import '../../App.css';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {createNewPost} from "../../api/api";
import useApp from "../../api/AppContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";
import {BoxStyle, InputStyle} from '../styles';

const postSchema = object({
    title: string().max(20, 'Max 20 marks').required('Title is requied'),
    content: string().max(40, 'Max 40 marks').min(10, 'Min 10 marks').required('Content is requied'),
});

export default function CreatePost() {
    const [openModal, setOpenModal] = useState(false);
    const {group, post, setPost} = useApp();
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
            setPost(post + 1);

        } else {
            console.log(isPostCreated.message);
            setOpenModal(false);
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>Add new post</Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>
                    <form onSubmit={handleSubmit(createPost)} className='form'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                            Create a post
                        </Typography>
                        <br/>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Title:
                            </InputLabel>
                            <InputStyle
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
                            <InputStyle
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