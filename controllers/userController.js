const { User, Post } = require('../models');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            message: `All users in the database, the Total is: ${users.length}`,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['firstName', 'lastName', 'email'],
            include: {
                model: Post,
                as: "posts",
                attributes: ['id', 'content', 'media', 'createdAt']
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: 'User found',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getByFirstName = async (req, res) => {
    try {
       const {firstName} = req.query;

       if (!firstName) {
        return res.send('Enter name in the Query Params')
       }

       const user = await User.findOne({where: {firstName}});
       res.status(200).json({
        message: 'User Found',
        data: user
       })
      
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    getByFirstName
}