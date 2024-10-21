import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import user from "./routes/user.route";
import post from "./routes/post.route";
import comment from "./routes/comment.route";
import reply from "./routes/reply.route";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:8081", // replace with your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const server = http.createServer(app);
const PORT = 3000;

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use("/", user);
app.use("/", post);
app.use("/", comment);
app.use("/", reply);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Server is running!");
});

const startServer = () => {
  server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
};

startServer();
