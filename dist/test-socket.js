"use strict";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000", {
    reconnectionDelayMax: 10000,
    auth: {
        token: "123"
    }
});
socket.on("connect", () => {
    console.log("Connected");
});
socket.on("connect_error", (error) => {
    console.error("Connect error", error);
});
