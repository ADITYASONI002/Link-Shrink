const shortid = require("shortid")
const config = require("../../config/config")

const urlShortener = async (req, res) => {
    try {
        const urlId = shortid.generate()
        const shortUrl = `${req.protocol}://${config.shortUrlDomain}/${urlId}`
        await req.redisClient.set(urlId, req.body.url, 'EX', config.redis.ttl)
        const response = {
            domain: config.shortUrlDomain,
            alias: urlId,
            deleted: false,
            archived: false,
            analytics: {
                enabled: false,
                public: false
            },
            tags: [],
            createdAt: Date(),
            expiresAt: new Date(Date.now() + config.redis.ttl * 1000).toISOString(),
            shortUrl,
            url: req.body.url
        }
        return res.json({ status: 1, message: "Short Url Generated Successfully", data: response })
    } catch (error) {
        console.error("controller:urlShortener:catch", { error: error.stack, stack: error.message })
        return res.json({ status: 0, error: error })
    }
}

const getShortUrl = async (req, res) => {
    const url = await req.redisClient.get(req.params.id);
    res.redirect(url)
}

module.exports = { urlShortener, getShortUrl }