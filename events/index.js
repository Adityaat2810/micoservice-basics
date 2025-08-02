const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events  = [];

// added endpoint to retrieve all events
app.get('/events', (req, res) => {
    res.send(events);
});


app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('Received event:', event);
    events.push(event);

    const services = [
        'http://post-clusterip-srv:4000/events',
        'http://comments-srv:4001/events',
        'http://query-srv:4002/events',
        'http://moderation-srv:4003/events',

    ];

    console.log('Sending event to services:', services);

    // Send to all services, but don't let one failure stop others
    for (const serviceUrl of services) {
        try {
            await axios.post(serviceUrl, event, { timeout: 3000 });
            console.log(`✓ Event sent to ${serviceUrl}`);
        } catch (error) {
            console.error(`✗ Failed to send to ${serviceUrl}:`, error.message);
        }
    }

    res.send({ status: "OK" });
});

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
});
