const express = require('express');
const app = express();
const cors = require('cors');
const {jwtAuthMiddleware} = require('./jwt');
const dotenv = require('dotenv');
dotenv.config();
require('./config/db');
const router = require('./routes/userRoutes');
const candidateRouter = require('./routes/candidateRoutes');
const votingRouter = require('./routes/votingRoutes');


app.use(cors());
app.use(express.json());

app.use("/user", router);
app.use("/candidate", jwtAuthMiddleware ,candidateRouter);
app.use("/vote", votingRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});

