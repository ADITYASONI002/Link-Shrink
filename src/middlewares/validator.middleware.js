const Joi = require("joi")

const urlValidation = Joi.object({
    url: Joi.string().uri({ scheme: ['http', 'https'] }).required()
})
module.exports = { urlValidation }