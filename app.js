const express = require("express");
const redis = require("redis")
const cors = require("cors")

const config = require("./config/config");
const shortUrl=require("./src/routes/shortUrl.route")

const app = express()
app.use(express.json());
app.use(cors({
    origin: config.allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const redisClient = redis.createClient(config.redis)
async function startServer() {
    try {
        await redisClient.connect();
        console.log(`Redis server connected on redis://${config.redis.host}:${config.redis.port}`);
        app.use((req, res, next) => {
            req.redisClient = redisClient;
            next();
        });
        app.use('/', shortUrl);

        app.listen(config.port, () => console.log(`Server started on PORT: ${config.port}`));
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
}

startServer();