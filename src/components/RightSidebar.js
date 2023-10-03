import React from "react";
import '../App.css';
import Profile from "./Profile";
import Group from "./Group";

export default function RightSidebar() {
    return (
        <div className="Sidebar" style={{padding: '1vh'}}>
            <Profile />
            <Group />
            <br></br>
        </div>
    );
}