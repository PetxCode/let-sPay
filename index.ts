import express, { Application } from "express";
import cors from "cors";
import { connect } from "mongoose";

import user from "./router/userRouter";
import purchase from "./router/purchasedRouter";
import vendor from "./router/vendorRouter";
import store from "./router/storeRouter";

const URL = "mongodb://localhost:27017/marketPlaceDB";

const port: number = 2255;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", user);
app.use("/api", vendor);
app.use("/api", store);
app.use("/api", purchase);

app.listen(port, async () => {
  await connect(URL).then(() => {
    console.log(`DB Connected `);
  });
});
