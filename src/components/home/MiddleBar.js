import React from "react";
import '../../App.css';
import CreatePost from "../post/CreatePost";
import Posts from "../post/Posts";

export default function MiddleBar() {
    return (
        <div className="MiddleBar">
            <Posts />
            <CreatePost />
        </div>
    );
}