require('dotenv').config();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function register(req, res) {
  try {
    const data = req.body;
    const file = req.file;
    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password
    data['password'] = await bcrypt.hash(data['password'], salt);

    const result = await User.uploadAndCreate(data, file);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);

    const authenticated = await bcrypt.compare(data.password, user['password']);

    if (!authenticated) {
      throw new Error('Incorrect credentials.');
    } else {
      const token = await Token.create(user.id);
      res.status(200).json({ authenticated: true, token: token.token, user_id: token.user_id });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function getUserId(req, res) {
  const data = req.body;
  try {
    const response = await Token.getOneByToken(data.token);
    // const userID = await response.json();
    const resp = await User.getOneById(response.user_id);
    res.status(201).json(resp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

  async function getUserInfo(req,res) {
    //uses getOneById
    const user_id = req.params.id
    try {
      const response = await User.getOneById(user_id);
      delete response.password;
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({error:err.message})
    }
  }

  async function update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const file = req.file;
      const userToUpdate = await User.getOneById(id);
  
      const updatedUser = await userToUpdate.update(data, file);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }



module.exports = {
  register,
  login,
  update,
  getUserId,
  getUserInfo
};
