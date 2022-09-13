import express from "express";

const app = express();

app.get("/ads", (request, response) => {
  return response.send({ message: "Fine" });
});

app.listen(3333);
