import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

//HERE I THINK WE JUST NEED TO FETCH THE COMMENTS

export const getCommentsForPost = createAsyncThunk('comments/fetchComments', async (post) => {
    try {
        // console.log(post) //FOR DEBUGGIN
        let response = await axios.get(`/api/post/comments?postId=${post.data.id}&subreddit=${post.data.subreddit}`);
        console.log(response.data);
        return response.data;           
    } catch (err) {
        throw Error(err.message);
    }

})


const comments = createSlice({
    name: 'comments',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsForPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCommentsForPost.fulfilled, (state, action) => {
                state.isLoading = null;
                state.error = null;
                state.comments = action.payload;
            })
            .addCase(getCommentsForPost.rejected, (state, action) => {
                state.isLoading = null;
                state.error = action.error.message;
            })
    }
})


export default comments.reducer;