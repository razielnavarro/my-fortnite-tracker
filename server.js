const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/stats', async (req, res) => {
    try {
        const { name } = req.query;
        const timeWindow = 'lifetime';
        const accountType = 'epic';

        const apiUrl = `https://fortnite-api.com/v2/stats/br/v2?name=${name}&accountType=${accountType}&timeWindow=${timeWindow}`;

        // Set up the Headers object with the authorization header
        const headers = new Headers();
        headers.append('Authorization', '7f63a1da-a518-49b2-84ab-6777a1775b36');

        // Make the API request to the Fortnite API
        const apiResponse = await fetch(apiUrl, { headers });
        const data = await apiResponse.json();

        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
