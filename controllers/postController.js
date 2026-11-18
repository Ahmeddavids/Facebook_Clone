const { Post, User } = require('../models');

const createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { content } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "Error creating Post: User does not exist"
            })
        }

        const newPost = await Post.create({
            content,
            userId
        });

        res.status(201).json({
            message: "Post created successfully",
            data: newPost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOnePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByPk(id,{
            attributes: ['id', 'content', 'media', 'createdAt'],
            include: {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'email']
            }
        });
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json({
            message: 'Post found',
            data: post
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createPost,
    getOnePost
}