import express from "express";

const app = express();
app.use(express.static("public"));

const hello = (req, res) => {
  return res.send({ key: "Simon" });
};
app.get("/hello", hello);

app.listen(3000);
