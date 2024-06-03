const express = require('express');
const cors = require('cors');
const axios = require('axios');

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
        var response1 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        console.log(response1.data.data.children[0]);
        postsArray.push(response1.data.data.children[0]);
        idsArray.push(response1.data.data.children[0].data.id);
        console.log(postsArray);
        console.log(idsArray);

        var response2 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response2.data.data.children[0].data.id))) {
            postsArray.push(response2.data.data.children[0]);
            idsArray.push(response2.data.data.children[0].data.id);
        }


        var response3 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response3.data.data.children[0].data.id))) {
            postsArray.push(response3.data.data.children[0]);
            idsArray.push(response3.data.data.children[0].data.id);
        }



        var response4 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response4.data.data.children[0].data.id))) {
            postsArray.push(response4.data.data.children[0]);
            idsArray.push(response4.data.data.children[0].data.id);
        }


        var response5 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response5.data.data.children[0].data.id))) {
            postsArray.push(response5.data.data.children[0]);
            idsArray.push(response5.data.data.children[0].data.id);
        }


        var response6 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response6.data.data.children[0].data.id))) {
            postsArray.push(response6.data.data.children[0]);
            idsArray.push(response6.data.data.children[0].data.id);
        }

        var response7 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response7.data.data.children[0].data.id))) {
            postsArray.push(response7.data.data.children[0]);
            idsArray.push(response7.data.data.children[0].data.id);
        }


        var response8 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response8.data.data.children[0].data.id))) {
            postsArray.push(response8.data.data.children[0]);
            idsArray.push(response8.data.data.children[0].data.id);
        }


        var response9 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response9.data.data.children[0].data.id))) {
            postsArray.push(response9.data.data.children[0]);
            idsArray.push(response9.data.data.children[0].data.id);
        }


        var response10 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response10.data.data.children[0].data.id))) {
            postsArray.push(response10.data.data.children[0]);
            idsArray.push(response10.data.data.children[0].data.id);
        }


        var response11 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response11.data.data.children[0].data.id))) {
            postsArray.push(response11.data.data.children[0]);
            idsArray.push(response11.data.data.children[0].data.id);
        }

        var response12 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        console.log(response12.data.data.children[0]);
        postsArray.push(response12.data.data.children[0]);
        idsArray.push(response12.data.data.children[0].data.id);
        console.log(postsArray);
        console.log(idsArray);

        var response13 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response13.data.data.children[0].data.id))) {
            postsArray.push(response13.data.data.children[0]);
            idsArray.push(response13.data.data.children[0].data.id);
        }


        var response14 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response14.data.data.children[0].data.id))) {
            postsArray.push(response14.data.data.children[0]);
            idsArray.push(response14.data.data.children[0].data.id);
        }



        var response15 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response15.data.data.children[0].data.id))) {
            postsArray.push(response15.data.data.children[0]);
            idsArray.push(response15.data.data.children[0].data.id);
        }


        var response16 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response16.data.data.children[0].data.id))) {
            postsArray.push(response16.data.data.children[0]);
            idsArray.push(response16.data.data.children[0].data.id);
        }


        var response17 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response17.data.data.children[0].data.id))) {
            postsArray.push(response17.data.data.children[0]);
            idsArray.push(response17.data.data.children[0].data.id);
        }

        var response18 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response18.data.data.children[0].data.id))) {
            postsArray.push(response18.data.data.children[0]);
            idsArray.push(response18.data.data.children[0].data.id);
        }


        var response19 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response19.data.data.children[0].data.id))) {
            postsArray.push(response19.data.data.children[0]);
            idsArray.push(response19.data.data.children[0].data.id);
        }


        var response20 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response20.data.data.children[0].data.id))) {
            postsArray.push(response20.data.data.children[0]);
            idsArray.push(response20.data.data.children[0].data.id);
        }


        var response21 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response21.data.data.children[0].data.id))) {
            postsArray.push(response21.data.data.children[0]);
            idsArray.push(response21.data.data.children[0].data.id);
        }


        var response22 = await axios.get(`https://www.reddit.com/r/${subredditNames[Math.floor(Math.random() * subredditNames.length)]}.json?sort=random&limit=1&raw_json=1`);
        if (!(idsArray.includes(response22.data.data.children[0].data.id))) {
            postsArray.push(response22.data.data.children[0]);
            idsArray.push(response22.data.data.children[0].data.id);
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
    console.log(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
    try {
        let response = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
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



