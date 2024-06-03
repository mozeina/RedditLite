import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export let getRandomPosts = createAsyncThunk('/api/getRandomPosts', async () => {
    try {
        let response = await axios.get('api/randomPosts');
        // console.log(response.data);
        return response.data;
    } catch (err) {
        throw Error(err.message);
    }
});

const initialState = {
    savedRandomPosts: [],
    noResults: false
};    

const randomPosts = createSlice({
    name: 'randomPosts',
    initialState,

    reducers: {
        saveRandomPosts: (state, action) => {
            state.savedRandomPosts = action.payload;
        },
        setNoResults: (state, action) => {
            state.noResults = action.payload;
        }
    },  

    extraReducers: (builder) => {
        builder
            .addCase(getRandomPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRandomPosts.fulfilled, (state, action) => {
                state.isLoading = null;
                state.error = null;
                state.randomPosts = action.payload;

            })
            .addCase(getRandomPosts.rejected, (state, action) => {
                state.isLoading = null;
                state.error = action.error.message;
            })
    }
})

export default randomPosts.reducer;
export const { saveRandomPosts, setNoResults } = randomPosts.actions;
