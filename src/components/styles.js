import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const RightUpButton = styled(Button)(({theme}) => ({
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: '#ABC357',
    color: 'white',
    '&:hover': {
        backgroundColor: '#7E6F88'
    },
    float: 'right',
    marginRight: '1%',
    padding: '0.5rem 2rem',
}));

export const RegisterLoginBox = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: theme.spacing(3),
}));

export const RegisterLoginPaper = styled(Paper)(({theme}) => ({
    width: '100%',
    maxWidth: 1000,
    maxHeight: 700,
    flexGrow: 1,
    backgroundColor: 'white',
    borderRadius: '30px',
    display:'center',
}));

export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: 'white',
    borderRadius: '0.5rem'
}));

export const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
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

export const StyledListItemButton2 = styled(ListItemButton)(({theme}) => ({
    '&.MuiListItemButton-root': {
        backgroundColor: '#ABC357',
        borderRadius: '0.4rem',
        margin: '1rem',
        color: 'white',
        textAlign: 'center',
        width: '10rem',
        padding:'0.5rem 1rem',
    },
    '&&.Mui-selected': {
        backgroundColor: '#ABC357',
        borderRadius: '0.4rem',
        textAlign: 'center',
        color: 'white',
        '&:hover': {
            backgroundColor: '#ABC357',
            borderRadius: '0.4rem',
            color: 'white',
        },
    },
    '&:hover': {
        backgroundColor: '#ABC357',
        borderRadius: '0.4rem',
        color: 'white',
    },
}));

export const BoxStyle = {
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
    textAlign: 'center',
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

export const InputStyle = styled(InputBase)(({theme}) => ({
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
