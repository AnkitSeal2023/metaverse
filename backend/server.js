import { Socket } from "socket.io";
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();

const server = createServer(app);
const allowedOrigins = ['http://localhost:5173','http://localhost:5173/game']; // Add your allowed origins here

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST']
    }
});
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST']
}));

io.on("connection", (socket) => {
    console.log("Connected socket");
    socket.on('left', () => 0);
    socket.on('right', () => 0);
    socket.on('up', () => 0);
    socket.on('down', () => 0);
    socket.on("joinroom",(room)=>socket.join(room));
    console.log("rooms:", socket.rooms);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

server.listen(3001, () => {
    console.log('Socket is running on port 3001');
}); 