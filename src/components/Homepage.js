import React from "react";

import '../styling/homepage.css';
import '../styling/mobile.css';
import '../styling/tablet.css';
import '../styling/desktop.css';
import '../styling/headerPlus767.css';

import RandomPosts from "../features/randomPosts/RandomPosts.js";

export default function Homepage() {

    return (
        <main className="main">
            <div className='random-posts'>
                <RandomPosts />
            </div>
        </main>
    );
}
