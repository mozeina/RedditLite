import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import SearchbarTabletDesktop from "./SearchbarTabletDesktop.js";
import { useNavigate } from 'react-router-dom';

import '../styling/homepage.css';
import '../styling/mobile.css';
import '../styling/tablet.css';
import '../styling/desktop.css';
import '../styling/headerPlus767.css';


function Header() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     function handleScroll() {
    //         const sidebar = document.getElementById('sidebar');
    //         let position = window.scrollY;
    //         if (position >= 75) {
    //             sidebar.className = '';
    //             sidebar.classList.add('fixed-sidebar')
    //         } else {
    //             sidebar.className = '';
    //             sidebar.classList.add('sidebar');
    //         }
    //     }
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [])


    return (
        <>
            <header className="header ">
                <div className="logotitle" onClick={() => navigate('/')}>
                    <Icon.Reddit className="redditLogo" data-testid='redditLogo' />
                    <h1 className="pageTitle jersey-10">RedditLite</h1>
                    <SearchbarTabletDesktop />
                </div>
            </header>
            <div id='sidebar' className='sidebar'>
                <p className='navlink-likedposts'><NavLink to='/upvoted'  className='nunito-sans' style={{textDecoration: 'none', fontSize: '1.25rem'}}>Liked Posts</NavLink></p>
            </div>
            <Outlet />
        </>
    )
}

export default Header;
