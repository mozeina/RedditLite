import { render, screen } from "@testing-library/react";
import RandomPosts from "../features/randomPosts/RandomPosts.js";
import randomPostsReducer from '../features/randomPosts/randomPostsSlice.js';
import likedPostsReducer from '../features/likedPosts/likedPostsSlice.js';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import { getRandomPosts } from "../features/randomPosts/randomPostsSlice.js";
import { waitFor } from "@testing-library/react";


jest.mock('axios');


describe('randomPosts', () => {

    let localStorageMock = (() => {
        let store = {};
        return {
            getItem: key => store[key] || null,
            setItem: (key, value) => store[key] = value !== undefined ? value.toString() : null,
            removeItem: (key) => delete store[key],
            clear: () => store = {}
        }
    })();

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
    });

    let mockRandomPostsData = [
        {
            data: {
                title: "first post",
                id: 1,
                author: 'author1'
            }
        },

        {
            data: {
                title: 'second post',
                id: 2,
                author: "author2"
            }
        },
        {
            data: {
                title: 'third post',
                id: 3,
                author: 'author3'
            }
        }
    ];


    it('renders div based on randomPostsSlice', () => {

        let store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                likedPosts: likedPostsReducer,
            },
            preloadedState: {
                randomPosts: {
                    randomPosts: mockRandomPostsData,
                    isLoading: null,
                    error: null
                },
                likedPosts: []
            }
        });


        const { unmount } = render(
            <Provider store={store}>
                <Router >
                    <RandomPosts />
                </Router>
            </Provider>
        )


        mockRandomPostsData.forEach(post => {
            expect(screen.getByText(post.data.title)).toBeInTheDocument();
            expect(screen.getByText(`u/${post.data.author}`)).toBeInTheDocument();
        });

        unmount();
    })
    it('shows error text and old posts when fetch was failed', async () => {

        const newStore = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                likedPosts: likedPostsReducer
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    error: 'error occured LOLOLfslfdsfdsf',
                },
                likedPosts: likedPostsReducer
            }
        });

        const randomPostsState = newStore.getState().randomPosts;


        render(
            <Provider store={newStore}>
                <Router >
                    <RandomPosts />
                </Router>
            </Provider>
        )

        window.localStorage.setItem('postsArray', JSON.stringify(mockRandomPostsData));


        await waitFor(() => {
            expect(screen.getByText('Uh Oh, There was an error with loading the posts...')).toBeInTheDocument();
            const existingPosts = JSON.parse(window.localStorage.getItem('postsArray'));
            existingPosts.forEach(post => {
                expect(screen.getByText(post.data.title)).toBeInTheDocument();
            })
            
        })

    })

    // it('shows err status 500 when failed fetch', () => {


    //     const store = configureStore({
    //         reducer: {
    //             randomPosts: randomPostsReducer,
    //         },
    //         preloadedState: {
    //             randomPosts: {
    //                 randomPosts: undefined,
    //                 isLoading: null,
    //                 error: true
    //             }
    //         }
    //     });

    //     let { getByText } = render(
    //         <Provider store={store}>
    //             <Router>
    //                 <RandomPosts />
    //             </Router>
    //         </Provider>
    //     )

    //     expect(getByText('500')).toBeInTheDocument();
    //     expect(getByText('Uh Oh, There was an error with loading the posts...')).toBeInTheDocument();

    // })
});

{/* <h1>500</h1><h2>Uh Oh, There was an error with loading the posts...</h2>
                        <h3>Please refresh the page and try again.</h3> */}