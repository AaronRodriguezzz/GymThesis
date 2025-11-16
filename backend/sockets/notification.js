import jwt from "jsonwebtoken";
import cookie from "cookie";

export let notifNamespace;

export function initNotifications(io) {
  notifNamespace = io.of("/notifications");

  notifNamespace.on("connection", async (socket) => {
    try {
        // Parse cookies safely
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");
        const token = cookies.admin;

        let decodedToken;
        if(token){
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        }
        const userId = decodedToken?._id;

        if(userId) socket.join(userId);
        console.log("User connected to Notifications namespace", userId || socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected to notifications namespace", socket.id);
        });
    } catch (err) {
        console.log("Error verifying token:", err.message);
        socket.disconnect();
    }
  });
}

export function emitNotification(data, to) {
    if (notifNamespace) {
        notifNamespace.to(to).emit("receiveNotification", data);
        console.log("Notification sent to:", to);
    } else {
        console.warn("Notifications namespace not initialized yet.");
    }
}