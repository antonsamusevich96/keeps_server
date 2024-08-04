import express from "express";
import mongoose from 'mongoose'
import userRouter from "./users/user.router";

const PORT = 5000
const dbURL = 'mongodb+srv://dantes:dantes_dantes@keeps.d9bnevl.mongodb.net/?retryWrites=true&w=majority&appName=Keeps'


const appServer = express();
appServer.use(express.json());
appServer.use('/api', userRouter)


const startApp = async () => {
  try {
    await mongoose.connect(dbURL)
    console.log('connected db')
  } catch (error) {
    console.log(error, 'error db')
  }
}

appServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

startApp()
