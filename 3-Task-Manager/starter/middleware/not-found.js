const notfound = (req,res) => {
    res.status(404).send(`Route not exist`)
}

module.exports = notfound