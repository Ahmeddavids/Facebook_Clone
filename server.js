require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 4000;
const sequelize = require('./database/database.js');
const userRouter = require('./routes/userRouter.js');
const postRouter = require('./routes/postRouter.js');

const app = express();
app.use(express.json());
app.use(postRouter)
app.use(userRouter)

const DBConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully')
    } catch (error) {
        console.log("Error connecting to Database: ", error.message)
    }
}

DBConnect();

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
