import Post from '../features/post/Post.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import randomPostsReducer from '../features/randomPosts/randomPostsSlice.js';
import commentsReducer from '../features/post/postSlice.js';
import { render, screen } from '@testing-library/react';
import RandomPosts from '../features/randomPosts/RandomPosts.js';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import likedPostsReducer from '../features/likedPosts/likedPostsSlice.js';
import likedPostsSlice from '../features/likedPosts/likedPostsSlice.js';






//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT
//IM IGNORING THIS FOR A BIT



// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//    useNavigate: () => mockedUsedNavigate,
//  }));



describe('Post component', () => {

    let mockRandomPostsData;
    let mockComments;
    let localStorageMock = (() => {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => store[key] = value !== undefined ? value.toString() : null,
            removeItem: (key) => delete store[key],
            clear: () => store = {}
        }
    })();
   
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
    });

    beforeEach(() => {
       
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

        mockComments = [
            {
                data: {
                    body: 'LOL'
                }
            },
            {
                data: {
                    body: 'WOW'
                }
            },
            {
                data: {
                    body: 'THIS IS AMAZING'
                }
            },
            {
                data: {
                    body: 'this place sucks'
                }
            },
            {
                data: {
                    body: 'omg lets gooooo'
                }
            },
        ];


        window.localStorage.setItem('mockRandomPostsData', JSON.stringify(mockRandomPostsData));


        //NO NEED FOR THIS IN THE POST COMPONENT  ||| Eh we might need it on reload?

    })

    it('renders post\'s divs based on id parameter from url', () => {


        const store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                comments: commentsReducer,
                likedPosts: likedPostsReducer,
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    randomPosts: mockRandomPostsData,
                    error: null
                },
                comments: {
                    isLoading: null,
                    comments: mockComments,
                    error: null
                },
                likedPosts: {
                    likedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: [],
                    dislikedPosts: []
                }
            }

        });


        render(
            <Provider store={store}>
                <Router initialEntries={['/post/2']}>
                    <Routes >
                        <Route path='/post/:id' element={<Post />} />
                    </Routes>
                </Router>
            </Provider>
        )

        let { randomPosts } = store.getState().randomPosts;
        let ourPost = randomPosts.find(post => post.data.id === 2);


        expect(ourPost.data.title).toBe('second post');
        expect(screen.queryByText('second post')).toBeInTheDocument();


        // const titleElement = screen.getByText('second post');
        // const authorElement = screen.getByText('author2');

        // expect(titleElement).toBeInTheDocument();
        // expect(authorElement).toBeInTheDocument();
    })

    it('doesn\'t render posts with different ids', () => {

        const store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                comments: commentsReducer,
                likedPosts: likedPostsReducer
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    randomPosts: mockRandomPostsData
                },
                comments: {
                    isLoading: true,
                    error: null
                },
                likedPosts: {
                    likedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: [],
                    dislikedPosts: []
                }
            }

        });


        const { queryByText } = render(
            <Provider store={store}>
                <Router initialEntries={['/post/2']}>
                    <Routes >
                        <Route path='/post/:id' element={<Post />} />
                    </Routes>
                </Router>
            </Provider>
        );


        const { randomPosts } = store.getState().randomPosts;

        let otherPosts = randomPosts.filter(post => {
            return post.data.id != 2;
        });

        otherPosts.forEach(post => {
            expect(queryByText(post.data.title)).not.toBeInTheDocument();
            expect(queryByText(post.data.author)).not.toBeInTheDocument();
        })



    })

    it('uses posts from localStorage when randomPosts is UNDEFINED ', () => {

        let store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                comments: commentsReducer, 
                likedPosts: likedPostsReducer
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    randomPosts: mockRandomPostsData
                },
                comments: {
                    isLoading: true,
                    error: null
                }, 
                likedPosts: {
                    likedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: [],
                    dislikedPosts: []
                }
            }
        });

        let { randomPosts } = store.getState().randomPosts;

        window.localStorage.setItem('postsData', JSON.stringify(randomPosts));


        store = configureStore({
            reducer: {
                randomPosts: randomPostsReducer,
                comments: commentsReducer,
                likedPosts: likedPostsReducer,
            },
            preloadedState: {
                randomPosts: {
                    isLoading: null,
                    error: true
                },
                comments: {
                    isLoading: true,
                    error: null
                }, 
                likedPosts: {
                    likedPosts: [],
                    likedIndexes: [],
                    dislikedIndexes: [],
                    dislikedPosts: []
                }
            }
        });

        randomPosts = store.getState().randomPosts.randomPosts;

        let ourPost;

        if (!randomPosts) {
            let postsArray = JSON.parse(window.localStorage.getItem('postsData'))
            
            ourPost = postsArray.find(post => {
                return post.data.id == 2;
            })
            
            render (
                <Provider store={store}>
                    <Router initialEntries={['/post/2']}>
                        <Routes >
                            <Route path='/post/:id' element={<Post />} />
                        </Routes>
                    </Router>
                </Provider>
            )
    
    
            expect(screen.getByText(ourPost.data.title)).toBeInTheDocument();
            expect(screen.getByText(`u/${ourPost.data.author}`)).toBeInTheDocument();

        }    

    });

})

