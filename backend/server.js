dotenv.config();
import app from './index.js';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import path from 'path';
import { Server } from "socket.io";
import { createServer } from 'http';
import registerSockets from './sockets/index.js';

const dirname = path.resolve();

const server = createServer(app);

const origin = process.env.NODE_ENV === 'production' ? '' : ['https://donsfitness.onrender.com', 'http://localhost:5173']

const io = new Server(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
});

registerSockets(io);


if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(dirname, "/frontend/dist")));
   app.get(/(.*)/, (req, res) => {
     res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
   }); 
  }

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to the Database');
    server.listen(process.env.PORT || 4001, () => {
      console.log(`Listening on ${process.env.CLIENT_URL || 4001}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });