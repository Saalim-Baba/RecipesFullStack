const express = require('express')
const fs = require("fs")
const router = express.Router()


router.get("/home", (request, response) => {
    response.send((fs.appendFileSync(__dirname + "index.html")))
    }
)
router.get("/overview", (request, response) => {
    response.
    }
)
module.exports = router