import express, { Request, Response} from 'express'
import path from 'path'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes/chat.routes'
import { sockets } from './sockets/chat'

const app = express();
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.use(routes)

sockets(io)

server.listen(3000, () => console.log("Web server running on port 3000!"));
