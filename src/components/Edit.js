import React, {useState, useEffect, useContext} from "react";
import ReactDOM from 'react-dom';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {object, string} from "yup";
import {Context} from "../Context";
import Profile from "./Profile";
//
export default function Edit() {
    let navigate = useNavigate();

    const {name, setName, username, setUsername} = useContext(Context);

    const [errorName, setErrorName] = useState();
    const [errorUsername, setErrorUsername] = useState();
    const [edited, setEdited] = useState();
    // const [numberName, setNumberName] = useState();



    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: name,
            username: username,
        }
    });

    const editSchema = object({

        name: string().max(15, 'Max 15 marks').required('Name is requied'),
        username: string().max(15, 'Max 15 marks').required('Username is requied'),

    });

    // const countName = () =>{
    //
    //     // setNumberName(username.length);
    //     // console.log(numberName);
    //     console.log(name);
    //
    // }


    const save = async (updateValues) => {

        if ((name === updateValues.name)&&(username === updateValues.username)) {
            // return navigate("/profile");

        }

        const isEditValid = await editSchema.isValid(updateValues, {abortEarly: false});

        console.log(updateValues.name);
        console.log(name);
        if (isEditValid) {

            fetch("http://localhost:3030/edit/me", {
                method: 'PUT',
                body: JSON.stringify(updateValues),
                headers: {
                    authorization: "Bearer " + localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(jsondata => {

                    setName(jsondata.name);
                    setUsername(jsondata.username);
                    setEdited(true);

                })
        } else {
            editSchema.validate(updateValues, {abortEarly: false})
                .catch((err) => {

                    let errors = [];
                    err.inner.forEach(error => {
                        errors[error.path] = error.errors;
                    })
                    setErrorName(errors.name);
                    setErrorUsername(errors.username);

                })

        }
    }

    // useEffect(() => {
    //     countName();
    // }, )

    return (
        <div className="Edit">
            {edited
                ?
                <div>
                    {navigate("/profile")}
                </div>
                : <form onSubmit={handleSubmit(save)}>
                    <p>Profile</p>
                    <h3>Name:</h3>
                    <input
                        id={'name'}
                        type='text'
                        placeholder={name}
                        {...register('name')}
                    />
                    <p style={{color: 'red'}} className="error">{errorName}</p>
                    <h3>Username:</h3>

                    <input
                        id={'username'}
                        type='text'
                        placeholder={username}
                        {...register('username')}
                    />
                    <p style={{color: 'red'}} className="error">{errorUsername}</p>
                    <br></br>
                    <Button variant="contained" type={'submit'}>Save</Button>
                </form>}
        </div>
    );
}