import { configureStore } from "@reduxjs/toolkit";
import  randomPosts  from "../features/randomPosts/randomPostsSlice.js";
import comments from '../features/post/postSlice.js'
import likedPosts from "../features/likedPosts/likedPostsSlice.js";

const store = configureStore({
    reducer: {
        randomPosts: randomPosts,
        comments: comments,
        likedPosts: likedPosts
    }
});

export default store;  