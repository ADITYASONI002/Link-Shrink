const express = require("express")
const { basicAuth } = require("../middlewares/auth.middleware");
const { urlValidation } = require("../middlewares/validator.middleware");
const { urlShortener, getShortUrl } = require("../controllers/shortUrl.controller");
const router = express.Router()

router.post('/shortUrl', basicAuth, (req, res) => {
    urlValidation
        .validateAsync(req.body, { convert: false })
        .then((validatedBody) => {
            req.body = validatedBody;
            return urlShortener(req, res)
        })
        .catch((error) => {
            console.error('route:short url:catch', { error: error.stack, stack: error.message });
            return res.json({ status: 0, error: error.details ? error.details[0].message : "Validation Error" })
        });
});
router.get('/:id', getShortUrl)

module.exports = router