const users = [
  {
    id: 1,
    name: 'Rebekah Johnson',
    email: 'Glover12345@gmail.com',
    password: '123qwe',
  },
  {
    id: 2,
    name: 'Fabian Predovic',
    email: 'Connell29@gmail.com',
    password: 'password',
  },
];

let posts = [
  {
    id: 1,
    title: '간단한 HTTP API 개발 시작!',
    content: 'Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.',
    userId: 1,
  },
  {
    id: 2,
    title: 'HTTP의 특성',
    content: 'Request/Response와 Stateless!!',
    userId: 1,
  },
];

// 아래에 코드를 작성해 주세요.
// 과제 1
const createUser = (req, res) => {
  const { id, name, email, password } = req.body.data;

  users.push({
    id: id,
    name: name,
    email: email,
    password: password,
  });

  res.status(201).json({ message: 'userCreated' });
};
// /signup 푸쉬할 때, postman에 넣어야 할 Body > raw / [JSON]
// {
//   "data": {
//   "id": 3,
//   "name" : "Roxy",
//   "email" : "misoamy16@gmail.com",
//   "password" : "24543"
//   }
// }

// 과제 2
const createPost = (req, res) => {
  const { id, title, content, userId } = req.body.data;

  posts.push({
    id,
    title,
    content,
    userId,
  });

  res.status(201).json({ message: 'postCreated' });
};
// /posts 푸쉬할 때, postman에 넣어야 할 Body > raw / [JSON]
// {
//   "data": {
//       "id": 100,
//       "title": "제목!",
//       "content" : "본문 !!",
//       "userId": 2
//   }
// }

// 과제 3
const getPost = (req, res) => {
  const postsWithUserName = posts.map((post) => {
    const user = users.find((user) => post.userId === user.id);

    return {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
      userId: post.userId,
      // 위 4줄을 ...post 라고 표현가능. (post의 property를 그대로 넣어준다는 뜻)
      userName: user.name,
    };
  });
  res.status(200).json({ data: postsWithUserName });
};

// 과제 4
const editPost = (req, res) => {
  const { id, content } = req.body;

  const post = posts.find((post) => post.id === id);
  post.content = content;

  const user = users.find((user) => post.userId === user.id);
  const newPost = {
    postId: post.id,
    postTitle: post.title,
    postContent: post.content,
    userId: post.userId,
    userName: user.name,
  };

  res.status(200).json({ data: { newPost } });
};
// /post 푸쉬할 때, postman에 넣어야 할 Body > raw / [JSON]
// {
//   "id" :1,
//   "content" : "노드"
// }

// 과제 5
const deletePost = (req, res) => {
  const newId = Number(req.query.id);
  const result = posts.filter((post) => post.id !== newId);
  posts = result;
  res.status(200).json({ data: posts });
};
// http://localhost:8000/delete?id=1 이 주소로 send해보기!

// 과제 6
const getUserPost = (req, res) => {
  const userId = Number(req.query.userId);
  const userInfo = users.find((user) => user.id === userId);
  const postings = posts.filter((post) => post.userId === userId);

  let newPostings = [];

  postings.forEach((post) => {
    let tmp = {
      postingId: post.id,
      postingName: post.title,
      postingContent: post.content,
    };
    newPostings.push(tmp);
  });

  const newPost = {
    userId,
    userName: userInfo.name,
    postings: newPostings,
  };

  res.status(200).json({ data: newPost });
};
// http://localhost:8000/user-post?userId=1 이 주소로 보내기!

module.exports = {
  createUser,
  createPost,
  getPost,
  editPost,
  deletePost,
  getUserPost,
};
