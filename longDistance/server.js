const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (including stealth_test.html)
app.use(express.static('.'));

app.post('/capture', (req, res) => {
  console.log('Captured:', req.body);
  res.send('OK');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000')); 