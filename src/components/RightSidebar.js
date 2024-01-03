import React from "react";
import '../App.css';
import Profile from "./Profile";
import Group from "./Group";
import Camera from "./Camera";
import LocationFinder from "./LocationFinder";

export default function RightSidebar() {
    return (
        <div className="RightSidebar" >
            <div className="buttons-container">
                <Profile />
                <Camera />
                <LocationFinder />
            </div>
            <Group />
        </div>
    );
}