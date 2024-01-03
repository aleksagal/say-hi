import React from "react";
import '../../App.css';
import Profile from "../user/Profile";
import Group from "../group/Group";
import Camera from "../camera/Camera";
import LocationFinder from "../userlocation/LocationFinder";

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