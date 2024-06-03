import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpvotesNum from "../../components/UpvotesNum";
import { useDispatch } from "react-redux";

import {
    addToLikedIndexes,
    removeFromLikedIndexes,
    addToDislikedIndexes,
    removeFromDislikedIndexes,
    addToLikedPosts,
    removeFromLikedPosts,
    addToDislikedPosts,
    removeFromDislikedPosts
}
    from '../likedPosts/likedPostsSlice.js';



import '../../styling/homepage.css';
import '../../styling/mobile.css';
import '../../styling/tablet.css';
import '../../styling/desktop.css';
import '../../styling/headerPlus767.css';
import '../../styling/post.css';


function LikedPosts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { likedPosts, dislikedPosts, likedIndexes, dislikedIndexes } = useSelector(state => state.likedPosts);

    const [postsToUse, setPostsToUse] = useState([]);

    const upvoteRefs = useRef([]);
    const downvoteRefs = useRef([]);



    function handleUpvote(postId, post) {
        if (likedIndexes.includes(postId)) {
            dispatch(removeFromLikedIndexes(postId));
            dispatch(removeFromLikedPosts(post));
        } else {
            dispatch(addToLikedIndexes(postId));
            dispatch(addToLikedPosts(post));
            if (dislikedIndexes.includes(postId)) {
                dispatch(removeFromDislikedIndexes(postId));
                dispatch(removeFromDislikedPosts(post));
            }
        }
        upvoteClick(postId)
    }

    function handleDownvote(postId, post) {
        if (dislikedIndexes.includes(postId)) {
            dispatch(removeFromLikedIndexes(postId));
            dispatch(removeFromLikedPosts(post))
        } else {
            dispatch(addToDislikedIndexes(postId));
            dispatch(removeFromLikedIndexes(postId));
            if (likedIndexes.includes(postId)) {
                dispatch(removeFromLikedIndexes(postId));
                dispatch(removeFromLikedPosts(post));
            }
        }
        downvoteClick(postId)
    }

    function upvoteClick(postId) {
        const upvote = upvoteRefs.current[postId];
        const downvote = downvoteRefs.current[postId];

        if (upvote.classList.contains('upvote') && (downvote.classList.contains('clickedDownvote') || downvote.classList.contains('downvote'))) {
            downvote.className = '';
            downvote.classList.add('downvote');
            upvote.className = '';
            upvote.classList.add('clickedUpvote');

        } else if (upvote.classList.contains('clickedUpvote')) {
            upvote.className = '';
            upvote.classList.add('upvote');
        } else return 
    }

    function downvoteClick(postId) {
        const upvote = upvoteRefs.current[postId];
        const downvote = downvoteRefs.current[postId];
        if (downvote.classList.contains('downvote') && (upvote.classList.contains('clickedUpvote') || upvote.classList.contains('upvote'))) {
            upvote.className = '';
            upvote.classList.add('upvote');
            downvote.className = '';
            downvote.classList.add('clickedDownvote');
        } else if (downvote.classList.contains('clickedDownvote')) {
            downvote.className = '';
            downvote.classList.add('donwvote');
        } else return
    }


    useEffect(() => {
        if (likedPosts) {
            setPostsToUse(likedPosts);
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='main-feed'>
            {postsToUse && postsToUse.length > 0 && postsToUse.map((post, index) => {
                return (
                    <div className='post' key={post.data.id}>
                        <div className='post-text-section' >
                            <div className='separate' onClick={() => navigate(`/post/${post.data.id}`)}>
                                <h2 className='post-title nunito-sans' >{post.data.title}</h2>
                                <h4 className='post-author nunito-sans' >u/{post.data.author}</h4>
                                <h4 className='post-subreddit  nunito-sans' >{post.data.subreddit_name_prefixed}</h4>
                            </div>
                            <div className='votes nunito-sans' key={`upvotes${index}`}>
                                <button className='clickedUpvote' data-testid={`upvote${index}`} ref={el => upvoteRefs.current[post.data.id] = el} onClick={() => handleUpvote(post.data.id, post)}></button>
                                <UpvotesNum ups={post.data.ups} />
                                <button className='downvote' data-testid={`downvote${index}`} ref={el => downvoteRefs.current[post.data.id] = el} onClick={() => handleDownvote(post.data.id, post)}></button>
                            </div>
                        </div>
                        {post.data.preview && post.data.preview.images && post.data.preview.images.length > 0 ? (
                            <div className="to-center" >
                                <img src={post.data.preview.images[0].source.url} className='post-thumbnail' />
                            </div>
                        ) : ''}

                    </div>
                )
            })}
            {postsToUse.length < 1 && (
                <div className="no-liked-posts jersey-10">
                    <h2>You have not liked any posts...</h2>
                </div>
            )}


        </div>
    )
}

export default LikedPosts
