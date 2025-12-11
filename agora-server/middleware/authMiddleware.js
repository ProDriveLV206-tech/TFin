const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(401).json({ error: 'no auth' });
  const token = bearer.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
};
