import { configureStore } from "@reduxjs/toolkit";
import Post from "../features/post/Post";
import { getCommentsForPost } from "../features/post/postSlice";
import comments from '../features/post/postSlice';
import randomPosts from '../features/randomPosts/randomPostsSlice';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react"; 
import likedPostsReducer from '../features/likedPosts/likedPostsSlice';

import axios from "axios";
import { Provider } from "react-redux";
jest.mock('axios');

describe('postSlice', () => {
    let store;
    let mockRandomPostsData;
    let mockCommentsForPost1;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                randomPosts: randomPosts,
                comments: comments,
                likedPosts: likedPostsReducer
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    randomPosts: mockRandomPostsData,
                    error: null
                }
            }
        })


        mockRandomPostsData = [
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

        // let mockCommentsForPost1 = [
        //     {
        //         data: {
        //             body: 'LOL'
        //         }
        //     },
        //     {
        //         data: {
        //             body: 'WOW'
        //         }
        //     },
        //     {
        //         data: {
        //             body: 'THIS IS AMAZING'
        //         }
        //     },
        //     {
        //         data: {
        //             body: 'this place sucks'
        //         }
        //     },
        //     {
        //         data: {
        //             body: 'omg lets gooooo'
        //         }
        //     },
        // ];

        mockCommentsForPost1 = [
            {
                data: {
                    id: 1,
                    author: 'mo',
                    body: 'hell no bro this sucksz!'
                }
            },
            {
                data: {
                    id: 2,
                    author: 'bira',
                    body: 'Paramore are pretty cool'
                }
            },
            {
                data: {
                    id: 3,
                    author: 'jack',
                    body: 'I dont think I agree with the laws and regulations'
                }
            },
            {
                data: {
                    id: 4,
                    author: 'Malek',
                    body: 'baby you and me we could'
                }
            },
            {
                data: {
                    id: 5,
                    author: 'John',
                    body: 'lets leave it all in the rear view'
                }
            },
        ];

    })

    it('fetches comments properly for given posts', async () => {


        render(
            <Provider store={store}>
                <Router initialEntries={['/post/2']}>
                    <Routes >
                        <Route path='/post/:id' element={<Post />} />
                    </Routes>
                </Router>
            </Provider>
        )

        axios.get.mockResolvedValue({ data: mockCommentsForPost1 });

        await store.dispatch(getCommentsForPost(mockRandomPostsData[1]));

        const ourComments = store.getState().comments.comments;
        console.log(ourComments); //TO CHECK IF OUR COMMENTS EXIST

        await waitFor(() => {
            ourComments.forEach(comment => {
                expect(screen.getByText(comment.data.body)).toBeInTheDocument();
            });
        });

    })
    it('shows Error on screen when failed to fetch comments', async () => {
        let errorMessage = 'Failed To Load Comments';

        render(
            <Provider store={store}>
                <Router initialEntries={['/post/2']}>
                    <Routes >
                        <Route path='/post/:id' element={<Post />} />
                    </Routes>
                </Router>
            </Provider>
        )

        axios.get.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(getCommentsForPost(mockRandomPostsData[1]));

        const commentsState = store.getState().comments;

        expect(commentsState.comments).toBeUndefined;
        expect(commentsState.error).toBe(errorMessage);

        expect(screen.getByText('Failed to load comments')).toBeInTheDocument();

    })



});


// <div className='comments'>
// <h3 className='comments-error nunito-sans'>Failed to load comments</h3>
// </div>