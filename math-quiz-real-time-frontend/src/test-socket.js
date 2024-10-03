import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true
});

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("connect_error", (error) => {
    console.error("Connection failed:", error);
});

socket.on("new-question", (data) => {
    console.log("Received question:", data);
});