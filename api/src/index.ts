import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";
import { router } from './routes'
import { AppError } from "@errors/AppError";
import http from 'http';
import { Server } from "socket.io";
import Queue from "lib/Queue";

Queue.process();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

server.listen(3333);

export { io }