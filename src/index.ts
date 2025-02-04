import { app, runServer } from "./app";
const Port = process.env.PORT;
runServer();
app.listen(Port, () => {
  console.log(`server is running http://localhost:${Port} `);
});
