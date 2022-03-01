const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

const mariadb = require("mariadb");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mariadb.createPool({
  user: "root",
  host: "localhost",
  password: "Trsgunasekara@123",
  database: "chat",
});

app.post("/create", async (req, res) => {
  const nickname = req.body.nickname;

  try {
    const result = await db.query(
      "INSERT INTO nicknames (nickname) VALUES(?)",
      [nickname]
    );
    res.send("data inserted");
  } catch (err) {
    throw err;
  }
});

//api for send users
app.get("/nicknames", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM nicknames");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});

const PORT = process.env.PORT || 8080;

let usersConnected = new Map();

io.on("connection", (socket) => {
  let { id } = socket.client;

  socket.on("user nickname", (nickname) => {
    usersConnected.set(nickname, [socket.client.id, socket.id]);

    //  2) Send list with connected sockets
    io.emit("users-on", Array.from(usersConnected.keys()));

    //  3) Send to all other users the 'nickname' of the new socket connected
    socket.broadcast.emit("welcome", nickname);
  });

  socket.on("chat message", ({ nickname, msg }) => {
    socket.broadcast.emit("chat message", { nickname, msg });
  });

  socket.on("chat message private", ({ toUser, nickname, msg }) => {
    let socketId = usersConnected.get(toUser)[1];
    io.to(socketId).emit("private msg", { id, nickname, msg });
  });

  socket.on("disconnect", () => {
    let tempUserNickname;
    // TODO: Improve this - Big O (N) - Not good if we have a lot of sockets connected
    // Find the user and remove from our data structure
    for (let key of usersConnected.keys()) {
      if (usersConnected.get(key)[0] === id) {
        tempUserNickname = key;
        usersConnected.delete(key);
        break;
      }
    }
    // Send to client the updated list with users connected
    io.emit("users-on", Array.from(usersConnected.keys()));

    // Send to cliente the nickname of the user that was disconnected
    socket.broadcast.emit("user-disconnected", tempUserNickname);
  });
});

server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
