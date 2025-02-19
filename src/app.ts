import express from 'express';
const app = express();
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorhandeler";
import routeNotFound from "./middlewares/routNotFound";
import Routes from "./routes";

// middleWares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to pH server..!");
});

// Routes
app.use("/api/v1", Routes);

// route not found
app.use(routeNotFound);

// global error handler
app.use(globalErrorHandler);

export default app;
