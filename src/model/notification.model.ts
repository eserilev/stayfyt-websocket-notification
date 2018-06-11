import { User } from "./user.model";

export class Notification {
    constructor(
        public sender: string, 
        public receiver: string, 
        public notificationType: string,) {}
}

export class PushNotification extends Notification{
    constructor(
        public sender: string, 
        public receiver: string, 
        public notificationType: string,) {
            super(sender, receiver, notificationType);
        }

 
}