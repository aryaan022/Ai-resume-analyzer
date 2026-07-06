const express =require("express");
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app =express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, //because we are handling cookies and we want to allow cross-origin requests with credentials
}))

app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

module.exports=app; 