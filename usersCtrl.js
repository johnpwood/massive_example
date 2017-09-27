
const getUserByName = (req, res, next) => {
  const db = req.app.get('db')
  db.getUserByName([req.query.name]).then(response => {
    res.json(response)
  })
}

module.exports = {
  getUserByName
}
