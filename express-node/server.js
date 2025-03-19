const express = require('express');
const renderApi = require('@api/render-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Authentication
renderApi.auth('rnd_1VHMCRJMIylp4pbv4X1hLhVrjwjB');

// Endpoint to get installed applications from Render
app.get('/', async (req, res) => {
    try {
        const { data } = await renderApi.listServices({ includePreviews: 'true', limit: '20' });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
