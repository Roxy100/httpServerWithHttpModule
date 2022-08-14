const http = require('http');
const express = require('express');
const {
  createUser,
  createPost,
  getPost,
  editPost,
  deletePost,
} = require('./app');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'hi!' });
});

app.post('/signup', createUser);
app.post('/posts', createPost);
app.get('/posts', getPost);
app.patch('/post', editPost);
app.delete('/delete', deletePost);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('server is listening on PORT 8000');
});
