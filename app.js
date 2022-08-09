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

  res.json({ message: 'userCreated' });
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

module.exports = { createUser };
