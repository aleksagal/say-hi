import React from "react";
import '../App.css';
import logo from "./logo_app.png";
import CreateGroup from "./CreateGroup";
import ShowGroups from "./ShowGroups";

export default function LeftBar() {
    return (
        <div className="LeftBar">
            <img src={logo} alt={'logo'} className={'logo'}/>
            <CreateGroup/>
            <ShowGroups/>
        </div>
    );
}