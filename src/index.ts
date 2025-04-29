// index.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

import routes from './routes';

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app); // <- para Socket.IO
const io = new Server(httpServer);    // <- instancia de Socket.IO

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const publicPath = join(__dirname, '..', 'public');
app.use('/assets', express.static(publicPath));

app.use(routes);

// Evento de conexión de agentes
io.on('connection', (socket) => {
    console.log('🔌 Agente conectado:', socket.id);

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ Agente desconectado:', socket.id);
    });
});

const uri = process.env.DB_URL;

if (uri) {
    connect(uri).then(() => {
        httpServer.listen(port, () => {
            console.log(`🛰️ app is running on port ${port}`);
        });
    }).catch(e => {
        console.log('❌ Failed to connect to MongoDB', e);
    });
} else {
    httpServer.listen(port, () => {
        console.log(`🛰️ app is running on port ${port} without database`);
    });
}
