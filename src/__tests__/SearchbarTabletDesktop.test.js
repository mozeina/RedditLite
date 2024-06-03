import Header from "../components/Header";
import Homepage from "../components/Homepage";
import likedPostsReducer from '../features/likedPosts/likedPostsSlice';
import { configureStore } from "@reduxjs/toolkit";
import randomPosts from '../features/randomPosts/randomPostsSlice';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';


describe('searchbar', () => {

    let localStorageMock = (() => {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => store[key] = value ? value.toString() : null,
            deleteItem: (key) => delete store[key],
            clear: () => store = {}
        }
    })();

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




    it('filters posts based on searchbar value (if posts exist)', () => {

        window.localStorage.setItem('data-array', JSON.stringify(mockRandomPostsData));

        const store = configureStore({
            reducer: {
                randomPosts: randomPosts,
                likedPosts: likedPostsReducer
            },
            preloadedState: {
                randomPosts: {
                    randomPosts: mockRandomPostsData,
                    noResults: false,
                    savedRandomPosts: mockRandomPostsData,
                    isLoading: null,
                    error: null
                },
                likedPosts: []
            }
        });

        render(
            <Provider store={store}>
                <Router initialEntries={['/']}>
                    <Routes>
                        <Route path='/' element={<Header />} >
                            <Route index element={<Homepage />} />
                        </Route>
                    </Routes>
                </Router>
            </Provider>
        )


        expect(screen.getByText('second post')).toBeInTheDocument();
        expect(screen.getByText('u/author2')).toBeInTheDocument();

        expect(screen.queryByText('first post')).toBeInTheDocument();
        expect(screen.queryByText('u/author1')).toBeInTheDocument();

        expect(screen.queryByText('third post')).toBeInTheDocument();
        expect(screen.queryByText('u/author3')).toBeInTheDocument();


        const searchInput = screen.getByPlaceholderText(/search reddit/i);
        fireEvent.change(searchInput, { target: { value: 'seco' } });

        screen.debug();
    
      

        expect(screen.getByText('second post')).toBeInTheDocument();
        expect(screen.getByText('u/author2')).toBeInTheDocument();
        expect(screen.getByText('subreddit 2')).toBeInTheDocument();

        expect(screen.queryByText('first post')).not.toBeInTheDocument();
        expect(screen.queryByText('u/author1')).not.toBeInTheDocument();
        expect(screen.queryByText('subreddit 1')).not.toBeInTheDocument();

        expect(screen.queryByText('third post')).not.toBeInTheDocument();
        expect(screen.queryByText('u/author3')).not.toBeInTheDocument();
        expect(screen.queryByText('subreddit 3')).not.toBeInTheDocument();
    })
});