import Box from "@mui/material/Box";
import React from "react";
import Modal from "@mui/material/Modal";
import {BoxStyle, StyledListItemButton2} from "./styles";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import useApp from "../api/AppContext";
import QRCode from "react-qr-code";

export default function QRCodeGenerator() {
    const {group} = useApp();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={"QRCodeGenerator"}>
                <StyledListItemButton2 onClick={handleOpen}>
                    Invite your friend
                </StyledListItemButton2>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={BoxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h3" className={'main-color'}>
                        Invite your friend to group
                    </Typography>
                    <br/>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
                    <QRCode
                        size={400}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={group ? group.groupName : 'Group doesnt exist'}
                        viewBox={`0 0 256 256`}
                    />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}