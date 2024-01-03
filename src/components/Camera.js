import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {BoxStyle} from "./styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function Camera() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);
    const [isCamera, setIsCamera] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setIsCamera(false);
    }, [webcamRef, setImgSrc]);

    const handleClick = () => {
        setIsCamera(true);
    };

    return (
        <div className={"camera"}>
            <IconButton onClick={handleOpen}> <CameraAltIcon/> </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>
                    {isCamera && (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            height={200}
                            style={{borderRadius: '30px'}}
                            screenshotFormat="image/jpeg"
                        />
                    )}
                    {imgSrc && !isCamera && (
                        <img style={{borderRadius: '30px'}} src={imgSrc} alt="Captured from Webcam"/>
                    )}
                    {isCamera && (
                        <Button variant="contained" onClick={capture}>Take a photo</Button>
                    )}
                    {!isCamera && (
                        <Button variant="contained" onClick={handleClick}>Take a new photo</Button>
                    )}
                    {!isCamera && (
                        <Button variant="contained" onClick={handleClose}>Save</Button>
                    )}
                </Box>
            </Modal>
        </div>
    )
}