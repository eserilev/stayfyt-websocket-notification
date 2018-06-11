
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { PushNotification } from './model/notification.model';



export class NotificationServer {
    public static readonly PORT:number = 9090;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || NotificationServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
             
            socket.on('notification', (n: PushNotification) => {
                console.log('[server](notification): %s', JSON.stringify(n));
              //  this.io.sockets.to(m.to).emit('message', m)  
              console.log(n)   
                this.io.to(n.receiver).emit('notification', n);           
                //this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}