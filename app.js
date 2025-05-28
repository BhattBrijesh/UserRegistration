require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { handleDBConnection } = require("./connection/connection");
const app = express();

const PORT = process.env.PORT;
const CONNECTIONURL = process.env.DB_CONNECTION_URL;
handleDBConnection(CONNECTIONURL);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server Connected on ${PORT} port`);
});
