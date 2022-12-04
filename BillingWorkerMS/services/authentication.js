var jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.AUTH_JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    else {
      req.user = user
      next()
    }

  })
}
