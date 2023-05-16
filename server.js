require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pinnedRepos = require('./routes/pinnedRepos');
app.use(pinnedRepos);

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});