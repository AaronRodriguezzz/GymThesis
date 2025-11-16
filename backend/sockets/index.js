import { initNotifications } from "./notification.js";


export default function registerSockets(io) {
    initNotifications(io);
}