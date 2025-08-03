console.log('***** POSTS SERVICE BUILD ' + new Date().toISOString());

const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = {};

app.get('/posts',(req, res)=>{
    res.send(posts);
})

app.post('/posts/create', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const title = req.body;

    posts[id] = {
        id, title
    }

    try{
        await axios.post('http://events-srv:4005/events', {
            type:"PostCreated",
            data:{
                id,
                title
         }
    })
    }catch(error){
        console.error('Axios error:', error.toString());
        console.error('Error code:', error.code);
        console.error('Error config:', error.config);
        if (error.response) {
        console.error('Response:', error.response.status, error.response.data);
  }
    }


    res.status(201).send(posts[id]);
})

app.post('/events', async (req, res) => {
    const event = req.body;

    console.log('Received Event:', event.type);

    res.send({ status: "OK" });
});

app.listen(4000,()=>{
    console.log(`listening on 4000`)
})