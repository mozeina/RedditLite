//THE APP COMPONENT WILL BE A BUNCH OF ROUTES

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from '../components/Homepage.js';
import SearchpageMobile from '../components/SearchpageMobile.js';
import RandomPosts from '../features/randomPosts/RandomPosts.js';
import Post from '../features/post/Post.js';
import Header from '../components/Header.js';
import Upvoted from '../components/Upvoted.js';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} >
            <Route index element={<Homepage />} /> 
            {/* <Route path='/' element={<RandomPosts />} /> */}
            <Route path='search' element={<SearchpageMobile />} />
            <Route path='post/:id' element={<Post />} />
            <Route path='/upvoted' element={<Upvoted />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
};

