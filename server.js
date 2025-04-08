import express from 'express';
import { scrape } from './scraper';
import cors from 'cors';

// Creating Express instance and setting the server port.
const app = express();
const PORT = 3001;

app.use(cors());

// Here I create my app endpoint that will handle the scraping request, at first I tested how to
// access and manipulate the query parameter using query string and returning it in JSON. Now it's set to return 
// the scrape function result, a json response with listed products.
app.get('/api/scrape', async (req, res) => {

    // Used a try catch to help during debug, as well as preventing the application from breaking.
    try {
        const keyword = req.query.keyword;

        console.log("Received keyword:", req.query.keyword);
        const products = await scrape(keyword);

        res.json({products});

    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Error during scraping' });
    }
});

// This allows me to set the server to listen to the specified port and to inform me that it's running.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});