import React from "react";

import '../styling/homepage.css';
import '../styling/mobile.css';
import '../styling/tablet.css';
import '../styling/desktop.css';
import '../styling/headerPlus767.css';

import LikedPosts from "../features/likedPosts/LikedPosts";

export default function Upvoted() {

    return (
        <main className="main">
            <div className='random-posts'>
                <LikedPosts />
            </div>
        </main>
    );
}
