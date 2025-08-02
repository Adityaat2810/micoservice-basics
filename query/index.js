const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
/**
 * {
 *    'id':{
 *       id: 'id'
 *       title: '',
 *       comments: [
 *         {id:"someId", content}
 *       ]
 *
 *     }
 * }
 */

app.get('/posts', (req, res)=>{
  res.send(posts)
});

const handleEvent=(type, data) => {
  if(type === 'PostCreated'){
    const {id , title} = data
    posts[id] = { id, title, comments: []}


  }

  if(type === 'CommentCreated'){
    const {id, content, postId, status} = data

    const post = posts[postId];
    post.comments.push({id, content, status});

  }

  if(type === 'CommentUpdated'){
    const { id, content, postId , status} = data

    const post = posts[postId];
    const comment = post.comments?.find(comment=> {
      return comment.id === id;
    })

    comment.status = status
    comment.content = content

  }
}

app.post('/events', (req, res) =>{
  const {type, data} = req.body;
  handleEvent(type, data);
  res.send({});


})


app.listen(4002, async () => {
  console.log(`!litening at 4002`);
  // whenver service come online after failing

  await axios.get('http://events-srv:4005/events')
    .then(response => {
      const events = response.data;
      events.forEach(event => {
        handleEvent(event.type, event.data);
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error.message);
    });
})


