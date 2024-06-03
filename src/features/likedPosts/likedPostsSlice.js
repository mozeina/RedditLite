import { createSlice } from "@reduxjs/toolkit";

const likedPosts = createSlice({
    name: 'likedPosts',
    initialState: {
        likedPosts: [],
        likedIndexes: [],

        dislikedPosts: [],
        dislikedIndexes: []
    },
    reducers: {
        addToLikedPosts: (state, action) => {
            state.likedPosts.push(action.payload);
        },
        removeFromLikedPosts: (state, action) => {
            state.likedPosts = state.likedPosts.filter(post => {
                return post.data.id !== action.payload.data.id;
            })
        },

        addToLikedIndexes: (state, action) => {
            state.likedIndexes.push(action.payload);
        },
        removeFromLikedIndexes: (state, action) => {
            state.likedIndexes = state.likedIndexes.filter(i => {
                return i !== action.payload;
            })
        },

        addToDislikedPosts: (state, action) => {
            state.dislikedPosts.push(action.payload)
        },
        removeFromDislikedPosts: (state, action) => {
            state.dislikedPosts = state.dislikedPosts.filter(post => {
                return post.data.id !== action.payload.data.id
            })
        },

        addToDislikedIndexes: (state, action) => {
            state.dislikedIndexes.push(action.payload);
        },
        removeFromDislikedIndexes: (state, action) => {
            state.dislikedIndexes = state.dislikedIndexes.filter(index => {
                return index !== action.payload
            })
        }
    }
})

export default likedPosts.reducer;
export const {
    addToLikedPosts,
    removeFromLikedPosts,
    addToLikedIndexes,
    removeFromLikedIndexes,
    addToDislikedPosts,
    removeFromDislikedPosts,
    addToDislikedIndexes, 
    removeFromDislikedIndexes
} = likedPosts.actions;
