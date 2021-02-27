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
// app.get('/our-contact', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'contact.html'));
// })

// app.post('/mail', (req, res) => {
//   const {name, from, subject, body} = req.body;
//   sendMail(from, name, subject, body, (err, data) => {
//     if(err) {
//       // res.status(500).json({
//       //   message: 'Internal Error, Please Resend'
//       // })
//       throw err;
//     } else {
//       res.json({
//         message: 'Your Message has Been Sent'
//       })
//     }
//   })
// })
// app.get("/sw_Site.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./sw_Site.js"));
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', '/not_found.html'));
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log();
})