import mongoose from 'mongoose';
import { app } from './app';
const port = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be define');
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongodb is connected sucessful');
  } catch (err) {
    console.log(`Their is some err: ${err}`);
  }

  app.listen(port, () => {
    console.log(`Listing on port: ${port}`);
  });
};

start();
