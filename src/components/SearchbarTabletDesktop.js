import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { saveRandomPosts, setNoResults } from "../features/randomPosts/randomPostsSlice";
import { useDispatch } from "react-redux";




import '../styling/homepage.css';
import '../styling/mobile.css';
import '../styling/tablet.css';
import '../styling/desktop.css';
import '../styling/searchbarstyle.css';



const SearchbarTabletDesktop = () => {

    const dispatch = useDispatch();
    const [width, setWidth] = useState(window.innerWidth);
    const [searchbarValue, setSearchbarValue] = useState('');

    const { randomPosts } = useSelector(state => state.randomPosts);
    const localStorageArray = JSON.parse(window.localStorage.getItem('data-array'));


    const handleChange = (e) => {
        setSearchbarValue(e.target.value);
    };


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    useEffect(() => {
        if (randomPosts) {
            let filteredPosts = randomPosts.filter(post => {
                return post.data.title.toLowerCase().includes(searchbarValue.toLowerCase())
                    ||  (`u/${post.data.author}`).toLowerCase().includes(searchbarValue.toLowerCase()) ||
                    post.data.subreddit_name_prefixed.toLowerCase().includes(searchbarValue.toLowerCase());
            });
            if (filteredPosts.length > 0) {
                dispatch(saveRandomPosts(filteredPosts));
                dispatch(setNoResults(false));
            } else {
                dispatch(saveRandomPosts([]));
                dispatch(setNoResults(true));
            }
        } else if (!randomPosts && localStorageArray && localStorageArray.length > 0) {
            let filteredPosts = localStorageArray.filter(post => {
                return post.data.title.toLowerCase().includes(searchbarValue.toLowerCase()) ||
                    (`u/${post.data.author}`).toLowerCase().includes(searchbarValue.toLowerCase()) ||
                    post.data.subreddit_name_prefixed.toLowerCase().includes(searchbarValue.toLowerCase())
            });
            if (filteredPosts.length > 0) {
                dispatch(saveRandomPosts(filteredPosts));
                dispatch(setNoResults(false));

            } else {
                dispatch(saveRandomPosts([]));
                dispatch(setNoResults(true));
            }
        }
        else return
    }, [searchbarValue]);

    return (
        <div className='searchbarTabletDesktop'>
            {width > 576 ?
                <form method="get" action="" >
                    <div className="tb">
                        <div className="td">
                            <input type="text" placeholder="Search Reddit" required value={searchbarValue} onChange={handleChange} data-testid='search-input' /></div>
                        <div className="td" id="s-cover">
                            <button type="submit" onClick={(e) => e.preventDefault() }>
                                <div id="s-circle"></div>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </form> : ''}
        </div>
    )
}

export default SearchbarTabletDesktop;

// 7 : 8 ratio