const express = require('express');
const cors = require('cors');
const axios = require('axios');
const process = require('process');

const port = process.env.PORT || 3001;
const app = express();


app.use(cors());


// app.get('/', (req, res) => {
//     res.status(200).send('<h1>YOOOOOOO WE\'RE HERE</h1>')
// })
// app.get('/api/searchsubreddit', async (req, res) => {
//     try {
//         let { query } = req.query;
//         console.log(query);
//         let response = await axios.get(`https://reddit.com/subreddits/search.json?q=${query}`);
//         res.send(response);
//     } 
//     catch (err) {
//         console.error(err);
//         res.status(500).json({"error": "an error has occured while trying to fetch the subreddits"});
//     }
// }); THIS WAS SUPPOSED TO BE THE HTTP REQUEST TO THE SEARHC

const baseUrl = process.env.REACT_APP_REDDIT_API_URL || 'https://www.reddit.com/';

app.get('/api/randomPosts', async (req, res) => {
    let subredditNames = [
        'funny',
        'askReddit',
        'gaming',
        'worldnews',
        'todayilearned',
        'aww',
        'music',
        'movies',
        'showerthoughts',
        'science',
        'jokes',
        'books',
        'diy',
        'food',
        'nottheonion',
        'iama',
        'art',
        'gifs',
        'getmotivated',

    ];
    let postsArray = [];
    let idsArray = [];
    try {
        for (let i  = 0; i < 25; i ++){
            const response = await axios.get(`${baseUrl}/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
            const post = response.data.data.children[0];
            
            if(!idsArray.includes(post.data.id)){
                postsArray.push(post);
                idsArray.push(post.data.id);
            }
        }
      
        console.log(idsArray);
        res.json(postsArray);
        // var data = response.data;
        // res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Bro please fix yo shit" });
    }
});

app.get('/api/post/comments', async (req, res) => {
    const { postId, subreddit } = req.query; 
    // console.log(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
    try {
        let response = await axios.get(`${baseUrl}/r/${subreddit}/comments/${postId}.json`)
        console.log(response.data[1].data.children);
        res.json(response.data[1].data.children);


    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "there was an problem with the fetch fix up lil bro" })
    }
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});



