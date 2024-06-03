//     TDD
import { configureStore } from "@reduxjs/toolkit"
import RandomPosts from "../features/randomPosts/RandomPosts";
import randomPostsReducer from '../features/randomPosts/randomPostsSlice';
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { screen, render, fireEvent  } from "@testing-library/react";
import likedPostsReducer from '../features/likedPosts/likedPostsSlice';



//so basically we render randomPosts... mock click on upvote and see if it was added to a new state in a new slice called likedPosts...
//mock click again and see if its no longer in the the state...


describe('likedPostsSlice', () => {

    let mockRandomPostsData = [
        {
            data: {
                title: "first post",
                id: 1,
                author: 'author1',
                subreddit_name_prefixed: 'subreddit 1'
            }
        },

        {
            data: {
                title: 'second post',
                id: 2,
                author: "author2",
                subreddit_name_prefixed: 'subreddit 2'
            }
        },
        {
            data: {
                title: 'third post',
                id: 3,
                author: 'author3',
                subreddit_name_prefixed: 'subreddit 3'
            }
        }
    ];

   
    it ('adds and removes upvoted and un-upvoted post to likedPosts array state in likedPosts slice', () => {
        const store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                likedPosts: likedPostsReducer 
            },
            preloadedState: {
                randomPosts: {
                    randomPosts: mockRandomPostsData,
                    savedRandomPosts: mockRandomPostsData,
                    isLoading: null,
                    error: null
                }, 
                likedPosts: {
                    likedPosts: [],
                    dislikedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: []
                }
            }
        });

        render (
            <Provider store={store}>
                <Router>
                    <RandomPosts />
                </Router>
            </Provider>
        )

        fireEvent.click(screen.getByTestId('upvote0'));

        let likedPostsArray = store.getState().likedPosts.likedPosts;

        expect(likedPostsArray.length).toBe(1);

        fireEvent.click(screen.getByTestId('upvote0'))

        likedPostsArray = store.getState().likedPosts.likedPosts;

        expect(likedPostsArray.length).toBe(0);
        
    })


})