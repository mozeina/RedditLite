import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRandomPosts } from './randomPostsSlice.js';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    addToLikedPosts,
    removeFromLikedPosts,
    addToLikedIndexes,
    removeFromLikedIndexes,
    addToDislikedPosts,
    removeFromDislikedPosts,
    addToDislikedIndexes,
    removeFromDislikedIndexes
} from '../likedPosts/likedPostsSlice.js';
import UpvotesNum from '../../components/UpvotesNum.js';
import { saveRandomPosts } from './randomPostsSlice.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';





import '../../styling/desktop.css';
import '../../styling/headerPlus767.css';
import '../../styling/homepage.css';
import '../../styling/mobile.css';
import '../../styling/searchbarstyle.css';
import '../../styling/tablet.css';



function RandomPosts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedRandomPosts, randomPosts, isLoading, error, noResults } = useSelector(state => state.randomPosts);
    const { likedPosts, dislikedPosts, likedIndexes, dislikedIndexes } = useSelector(state => state.likedPosts);
    const [ handleUpvoteDone, setHandleUpvoteDone ] = useState(true);
    const [ handleDownvoteDone, setHandleDownvoteDone ] = useState(true);

    const upvoteRefs = useRef([]);
    const downvoteRefs = useRef([]);


    useEffect(() => {
        if (likedIndexes) {
            likedIndexes.length > 0 && likedIndexes.map(postId => {
                let upvote = upvoteRefs.current[postId];
                let downvote = downvoteRefs.current[postId];
                upvote.className = '';
                downvote.className = '';
                upvote.classList.add('clickedUpvote');
                downvote.classList.add('downvote');

            })
        }
      
    }, [handleUpvoteDone]);

    useEffect(() => {
        if (dislikedIndexes){
            dislikedIndexes.length > 0 && dislikedIndexes.map(postId => {
                let upvote = upvoteRefs.current[postId];
                let downvote = downvoteRefs.current[postId];
                upvote.className = '';
                downvote.className = '';
                upvote.classList.add('upvote');
                downvote.classList.add('clickedDownvote');
                
            })
          
        }
    }, [handleDownvoteDone]);

    useEffect(() => {
        if (!randomPosts) {
            dispatch(getRandomPosts());
        }
    }, []);


    useEffect(() => {
        if (!isLoading && randomPosts) {
            if (randomPosts.length > 0) {
                // console.log(randomPosts);
                dispatch(saveRandomPosts(randomPosts));
                window.localStorage.setItem('data-array', JSON.stringify(randomPosts));
            }
        }
    }, [randomPosts])

    useEffect(() => {
        if (error) {
            dispatch(saveRandomPosts(JSON.parse(window.localStorage.getItem('data-array'))));
        }
    }, [error])

    function handleUpvote(postId, post) {
        const element = upvoteRefs.current[postId];
        if (!(likedIndexes.includes(postId))) {
            dispatch(addToLikedPosts(post));
            dispatch(addToLikedIndexes(postId));
            if (dislikedIndexes.includes(postId)) {
                dispatch(removeFromDislikedPosts(post));
                dispatch(removeFromDislikedIndexes(postId));
            }
            setHandleUpvoteDone(!handleUpvoteDone);
        } else {
            dispatch(removeFromLikedPosts(post));
            dispatch(removeFromLikedIndexes(postId));
            element.className = '';
            element.classList.add('upvote');
            setHandleUpvoteDone(!handleUpvoteDone);
        }
    }



    function handleDownvote(postId, post) {
        const element = downvoteRefs.current[postId];
        if (!(dislikedIndexes.includes(postId))){
            dispatch(addToDislikedIndexes(postId));
            dispatch(addToDislikedPosts(post));
            if (likedIndexes.includes(postId)){
                dispatch(removeFromLikedIndexes(postId));
                dispatch(removeFromLikedPosts(post));
            }
            setHandleDownvoteDone(!handleDownvoteDone);
        } else {
            dispatch(removeFromDislikedIndexes(postId));
            dispatch(removeFromDislikedPosts(post));
            element.className = '';
            element.classList.add('downvote');
            setHandleDownvoteDone(!handleDownvoteDone);
        }
    }


    // useEffect(() => {
    //     console.log('likedIndexes: ', likedIndexes);
    //     console.log('dislikedIndexes: ', dislikedIndexes);
    // }, [likedIndexes, dislikedIndexes]);

    return (
        <div className='main-feed'>
            {/* IS IS STILL LOADING */}
            {isLoading && (
                Array(6).fill(0).map((skeleton, index) => {
                    return (
                        <div className='post' key={`skeleton${index}`}>
                            <div className='post-text-section' style={{ width: '75%', margin: '0 auto' }}>
                                <h2 className='post-title nunito-sans'><Skeleton /></h2>
                                <h4 className='post-author nunito-sans'><Skeleton /></h4>
                                <h4 className='post-subreddit  nunito-sans'><Skeleton /></h4>
                            </div>
                            <div className='skeleton-image'>
                                <Skeleton stlye={{ height: 300 }} />
                            </div>
                        </div>
                    )
                })
            )}


            {/* IF THERE WAS AN ERROR WITH LOADING POSTS */}
            {!isLoading && error && (
                <div className='random-posts-error jersey-10' style={{ color: 'white', display: 'flex' }}>
                    <div style={{ marginTop: 75, letterSpacing: 2, fontSize: '1.5rem' }}>
                        <h1>500</h1>
                        <h2>Uh Oh, There was an error with loading the posts...</h2>
                        <h3>Please refresh the page and try again.</h3>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/yTo79yGTE.png`} width={400} height={400} style={{ marginTop: 10 }} alt='sad reddit logo' />
                </div>
            )}



            {/* IF POSTS LOADED SUCCESSFULLY */}
            {savedRandomPosts && savedRandomPosts.length > 0 && savedRandomPosts.map((post, index) => {
                return (
                    <div className='post' key={post.data.id}  >
                        <div className='post-text-section' >
                            <div className='separate' onClick={() => navigate(`/post/${post.data.id}`)}>
                                <h2 className='post-title nunito-sans' >{post.data.title}</h2>
                                <h4 className='post-author nunito-sans' >u/{post.data.author}</h4>
                                <h4 className='post-subreddit  nunito-sans' >{post.data.subreddit_name_prefixed}</h4>
                            </div>
                            <div className='votes nunito-sans' key={`upvotes${index}`}>
                                <button className='upvote' data-testid={`upvote${index}`} ref={el => upvoteRefs.current[post.data.id] = el} onClick={() => handleUpvote(post.data.id, post)}></button>
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

            {/* IF NO RESULTS WHEN SEARCH */}
            {noResults && (
                <h2 className='nunito-sans' style={{ textAlign: 'center', color: 'rgb(30, 148, 19)', marginTop: 25 }}>No results found</h2>
            )}




        </div>
    )
}

export default RandomPosts; 
