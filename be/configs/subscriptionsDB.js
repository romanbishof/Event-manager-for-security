import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/ismsDB', () => console.log('connected to DB'), e => console.error(e))