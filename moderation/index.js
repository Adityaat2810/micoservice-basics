const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events',async (req, res)=> {
    const {type , data} = req.body;
    if(type === "CommentCreated"){
        const status = data.content?.includes('orange') ? 'rejected' : 'approved'
        console.log('status is ', status)
        await axios.post('http://localhost:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        });



    }

    console.log('H_______')

    res.send({})

})

app.listen(4003, () => {
  console.log(`!litening at 4003`);
})