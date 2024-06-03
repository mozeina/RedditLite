import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import LikedPosts from "../features/likedPosts/LikedPosts";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import RandomPosts from "../features/randomPosts/RandomPosts";
import randomPostsReducer from '../features/randomPosts/randomPostsSlice';
import likedPostsReducer from '../features/likedPosts/likedPostsSlice';



describe('LikedPosts', () => {

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


    it('renders posts that have been added to Liked Posts', () => {
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
                    likedPosts: mockRandomPostsData.filter(post => post.data.id === 2 || post.data.id === 3),
                    dislikedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: []
                }
            }
        });

        const newArray = store.getState().likedPosts.likedPosts;

        render(
            <Provider store={store}>
                <Router>
                    <LikedPosts />
                </Router>
            </Provider>
        )


        expect(screen.getByText('second post')).toBeInTheDocument();
        expect(screen.getByText('third post')).toBeInTheDocument();

        expect(screen.queryByText('first post')).not.toBeInTheDocument();

    })
    it('prints "no upvoted posts" when there are no liked posts', async () => {
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

        render(
            <Provider store={store}>
                <Router>
                    <LikedPosts />
                </Router>
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('You have not liked any posts...')).toBeInTheDocument();
        })

    })


})