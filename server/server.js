const express = require('express');
const cors = require('cors');
const axios = require('axios');
const process = require('process');
const port = process.env.PORT || 3001;
const app = express();


app.use(cors());


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
        const ourUrl = process.env.REACT_APP_REDDIT_API_URL || 'https://www.reddit.com/'
        for (let i  = 0; i < 15; i ++){
            const response = await axios.get(`${ourUrl}r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
            const post = response.data.data.children[0];
            
            if(!idsArray.includes(post.data.id)){
                postsArray.push(post);
                idsArray.push(post.data.id);
            }
        }
        res.json(postsArray);

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Bro please fix yo shit" });
    }
});

app.get('/api/post/comments', async (req, res) => {
    const { postId, subreddit } = req.query; 
    const ourUrl = process.env.REACT_APP_REDDIT_API_URL || 'https://www.reddit.com/'
    try {
        let response = await axios.get(`${ourUrl}r/${subreddit}/comments/${postId}.json`);
        console.log('comments', response.data[1].data.children);
        res.json(response.data[1].data.children);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "there was an problem with the fetch fix up lil bro" })
    }
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});



