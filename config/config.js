require("dotenv").config()

module.exports = {
    port: process.env.PORT || 8000,
    allowedOrigins: process.env.ALLOWED_ORIGINS || "https://short-url.com",
    clientId: process.env.CLIENT_ID || "8a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p",
    clientSecret: process.env.CLIENT_SECRET || "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || "redis@pass",
        ttl: process.env.REDIS_TTL || 365 * 24 * 60 * 60
    },
    shortUrlDomain: process.env.SHORT_URL_DOMAIN || "short-url.com",
}