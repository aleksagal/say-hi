import React from "react";
import '../App.css';
import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function MiddleBar() {
    return (
        <div className="MiddleBar">
            <Posts />
            <CreatePost />
        </div>
    );
}