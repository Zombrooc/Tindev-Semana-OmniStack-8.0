const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

try {
  mongoose.connect(
    "mongodb+srv://zombrooc:IronM@n0552@tindev.ma6zb.mongodb.net/Tindev?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (error) {
  console.log(error);
}

const connectedUsers = {
}

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  next();
})

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use(require("./routes"));

server.listen(3333);
