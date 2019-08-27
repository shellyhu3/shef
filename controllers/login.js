const handleLogin = (db, bcrypt) => (req, res) => {
  let errors = {};
  const { email, pw } = req.body;
  db.select('email', 'hash').from('login')
    .where({email: email})
    .then(data => {
      const isValid = bcrypt.compareSync(pw, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where({email: email})
          .then(user => {
            return res.json(user[0])
          })
          .catch(err => {
            errors.login = 'unable to get user';
            return res.json(errors)
          })
      } else {
        errors.login = 'login failed';
        return res.json(errors);
      }
    })
    .catch(err => {
      errors.login = 'login failed';
      return res.json(errors);
    })
}

module.exports = {
  handleLogin
}