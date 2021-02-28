const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/about-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about-us.html'));
})
app.get('/our-services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
})
app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pricing.html'));
})
app.get('/contact-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
})
app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/not_found.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log();
})