import React, {useState, useEffect} from 'react';
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {BoxStyle} from "./styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from "@mui/material/Typography";

export default function LocationFinder() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [position, setPosition] = useState({latitude: null, longitude: null});

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    return (
        <div className={"location"}>
            <IconButton onClick={handleOpen}> <LocationOnIcon/> </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                        Current Location
                    </Typography>
                    {position.latitude && position.longitude ? (
                        <p>
                            {position.latitude} {position.longitude}
                        </p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Box>
            </Modal>
        </div>
    );
}