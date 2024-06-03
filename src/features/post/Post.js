
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentsForPost } from './postSlice.js';
import UpvotesNum from '../../components/UpvotesNum.js';
//FOR REACT SKELETON 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import '../../styling/homepage.css';
import '../../styling/mobile.css';
import '../../styling/tablet.css';
import '../../styling/desktop.css';
import '../../styling/headerPlus767.css';
import '../../styling/post.css';
import CommentWithLinks from '../../components/CommentWithLinks.js';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { 
  addToLikedIndexes,
  removeFromLikedIndexes, 
  addToDislikedIndexes,
  removeFromDislikedIndexes,
  addToLikedPosts,
  removeFromLikedPosts,
  addToDislikedPosts,
  removeFromDislikedPosts
 } from '../likedPosts/likedPostsSlice.js';


function Post() {

  const dispatch = useDispatch();
  const { randomPosts } = useSelector(state => state.randomPosts);

  let { comments, error, isLoading } = useSelector(state => state.comments);



  // const {comments, error, isLoading} = useSelector(state => state);

  const { likedPosts, dislikedPosts, likedIndexes, dislikedIndexes } = useSelector(state => state.likedPosts);
  const { id } = useParams();
  const [post, setPost] = useState();
  const [ handleUpvoteDone, setHandleUpvoteDone ] = useState(true);
  const [ handleDownvoteDone, setHandleDownvoteDone ] = useState(true)


  useEffect(() => {
    if (randomPosts) {
      let ourPost = randomPosts.find(post => post.data.id == id);
      if (ourPost) {
        setPost(ourPost);
        window.localStorage.setItem(`post${id}`, JSON.stringify(ourPost));
      } else {
        setPost(JSON.parse(window.localStorage.getItem(`post${id}`)));
      }
    } else {
      setPost(JSON.parse(window.localStorage.getItem(`post${id}`)));
    }
  }, []);



  useEffect(() => {
    if (post) {
      dispatch(getCommentsForPost(post));
    }
  }, [post])

  useEffect(() => {
    if (post) {
      const upvote = document.getElementById('upvote');
      const downvote = document.getElementById('downvote');
      if (upvote) {
        if (likedIndexes.includes(post.data.id)) {

          upvote.className = '';
          upvote.classList.add('clickedUpvote');

        } else {
          upvote.className = '';
          upvote.classList.add('upvote');
        }
      }
      if (downvote) {
        if (dislikedIndexes.includes(post.data.id)) {
          downvote.className = '';
          downvote.classList.add('clickedDownvote');
        } else {
          downvote.className = '';
          downvote.classList.add('downvote');
        }
      }
    }


  }, [post,  handleUpvoteDone, handleDownvoteDone ]);




  function handleUpvote(postId) {
    if (post) {
      if (!(likedIndexes.includes(postId))) {
        dispatch(addToLikedIndexes(postId));
        dispatch(addToLikedPosts(post));
        if (dislikedIndexes.includes(postId)){
          dispatch(removeFromDislikedIndexes(postId));
          dispatch(removeFromDislikedPosts(post));
        }
        setHandleUpvoteDone(!handleUpvoteDone);
      } else {
        dispatch(removeFromLikedIndexes(postId));
        dispatch(removeFromLikedPosts(post));
        setHandleUpvoteDone(!handleUpvoteDone);
      }
    }
  }

  function handleDownvote(postId) {
   if (post) {
    if(!(dislikedIndexes.includes(postId))){
      dispatch(addToDislikedIndexes(postId))
      dispatch(addToDislikedPosts(post));
      if (likedIndexes.includes(postId)){
        dispatch(removeFromLikedIndexes(postId));
        dispatch(removeFromLikedPosts(post));
      }
      setHandleDownvoteDone(!handleDownvoteDone);
    } else {
      dispatch(removeFromDislikedIndexes(postId));
      dispatch(removeFromDislikedPosts(post));
      setHandleDownvoteDone(!handleDownvoteDone);
    }
   } 
  }

  const [visible, setVisible] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <main className='main1'>

      {/* POST ------------> */}

      {/* POST NOT FOUND */}
      {!post && !window.localStorage.getItem(`post${id}`) && (
        <div className='random-posts-error jersey-10' style={{ color: 'white', display: 'flex', width: '60%', margin: '0 auto' }}>
          <div style={{ marginTop: 75, letterSpacing: 2, fontSize: '1.5rem' }}>
            <h1>404</h1>
            <h2>Uh Oh, post has not been found...</h2>
            <h3>Please refresh the page and try again.</h3>
          </div>
          <img src={`${process.env.PUBLIC_URL}/yTo79yGTE.png`} width={400} height={400} style={{ marginTop: 10 }} alt='sad reddit logo' />
        </div>
      )}

      {/* LOAD OUR POST  */}
      {post && (
        <div className='post1' key={post.data.id} >
          <div className='post-text-section'>
            <div className='separate'>
              <h2 className='post1-title nunito-sans'>{post.data.title}</h2>
              <h4 className='post1-author nunito-sans'>u/{post.data.author}</h4>
              <h4 className='post1-subreddit  nunito-sans'>{post.data.subreddit_name_prefixed}</h4>
            </div>
            <div className='votes nunito-sans'>
              <button className='upvote' id='upvote' onClick={() => handleUpvote(post.data.id)}></button>
              <UpvotesNum ups={post.data.ups} />
              <button className='downvote' id='downvote' onClick={() => handleDownvote(post.data.id)}></button>
            </div>
          </div>
          {post.data.preview && post.data.preview.images && post.data.preview.images.length > 0 ? (
            <div className="to-center" >
              <img src={post.data.preview.images[0].source.url} className='post1-thumbnail' />
            </div>
          ) : ''}
          {post.data.selftext && (

            <h4 className='post1-text nunito-sans break'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.data.selftext}
              </ReactMarkdown>
            </h4>
          )}

        </div>
      )}

      {/* COMMENTS ---------> */}
      {/* IF STILL LOADING COMMENTS  */}
      {isLoading && (
        <div className='comments'>
          <h3 className='post1-comments-title nunito-sans'><Skeleton /></h3>
          {Array(5).fill(0).map((ensa, index) => {
            return (
              <div className='comment' style={{ margin: '40px auto', width: '80%' }} key={`skeleton${index}`}>
                <Skeleton count={5} />
              </div>
            )
          })}

        </div>
      )}

      {/* IF COMMENTS ARE LOADED WITH NO ERROR */}
      {comments && !isLoading && !error && (
        <div className='comments'>
          <h3 className='post1-comments-title nunito-sans'>Comments</h3>
          {comments.length > 0 ? comments.slice(0, visible).map(comment => {
            return (
              <div className='comment' key={comment.data.id}>
                <CommentWithLinks comment={comment} />
              </div>
            )
          }) : <p className='nunito-sans no-comments'>There are no comments for this post.</p>}
          {comments.length > 0 && !(visible >= comments.length) && <button className='load-more button-88' onClick={() => setVisible(prev => prev + 5)}>Load More</button>}
        </div>
      )}

      {/* IF LOADING FINISHED AND THERE WAS AN ERROR  */}
      {!comments && !isLoading && error && (
        <div className='comments'>
          <h3 className='comments-error nunito-sans'>Failed to load comments</h3>
        </div>
      )}



    </main >
  )
};

export default Post;
