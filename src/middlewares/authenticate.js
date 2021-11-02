const validate = (req, res, next) => {
  const auth = { login: 'teste', password: '123' }
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (login && password && login === auth.login && password === auth.password) {
    return next()
  }

  res.set('WWW-Authenticate', 'Basic realm="401"')
  res.status(401).send('Authentication required.')
}

module.exports = validate;