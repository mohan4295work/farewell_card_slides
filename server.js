const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serves your HTML file

const DB_FILE = './database.json';

// Save endpoint
app.post('/api/save', (req, res) => {
    const { data } = req.body;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ status: 'success' });
});

// Load endpoint
app.get('/api/load/:id', (req, res) => {
    if (fs.existsSync(DB_FILE)) {
        const data = JSON.parse(fs.readFileSync(DB_FILE));
        res.json({ data });
    } else {
        res.json({ data: null });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));