import { app, runServer } from "./app";
import dotenv from "dotenv";
dotenv.config();
const Port = process.env.PORT;
runServer();
app.listen(Port, () => {
  console.log(`server is running http://localhost:${Port} `);
});
