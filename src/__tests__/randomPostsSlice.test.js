import axios from 'axios';
import randomPostsReducer, { getRandomPosts } from '../features/randomPosts/randomPostsSlice.js';
import { configureStore } from '@reduxjs/toolkit';
jest.mock('axios');




describe('randomPostsSlice', () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer //the randomPosts slice has the loading, error, and randomPosts properties
            }
        })
    });

    it('fetches data correctly', async () => {
        let responseData = [
            { "title": "post1", "id": "1" },
            { "title": "post2", "id": "2" }
        ];
        axios.get.mockResolvedValue({
            data: responseData
        });

        await store.dispatch(getRandomPosts());
        let state = store.getState().randomPosts;
        

        expect(state.isLoading).toBeNull();

        expect(state.randomPosts).toBe(responseData);
        expect(state.error).toBeNull();

    })
    it('handles errors gracefully', async () => {
        let errorMessage = 'We got an error';

        axios.get.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(getRandomPosts());

        let state = store.getState().randomPosts;


        expect(state.isLoading).toBeNull();
        expect(state.randomPosts).toBeUndefined();
        expect(state.error).toBe(errorMessage);


    })
});