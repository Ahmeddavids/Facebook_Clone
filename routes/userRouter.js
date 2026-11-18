const express = require("express")
const router = express.Router();

const { createUser, getAllUsers, getOneUser, getByFirstName} = require("../controllers/userController");
const { createUserValidation } = require('../middlewares/validator')

router.post('/newUser', createUserValidation, createUser);

router.get('/allUsers', getAllUsers );

router.get('/oneUser/:id', getOneUser);

router.get('/user/name', getByFirstName);

module.exports = router
