import app from "./app.js";

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Sever is listening on port ${port}`);
});
