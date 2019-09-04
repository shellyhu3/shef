const handleRegister = (db, bcrypt, saltRounds) => (req, res) => {
  let errors = {};
  const { first_name, last_name, email, pw } = req.body;

  db('users')
    .where({
      email: email
    })
    .select('email')
    .then(data => {
      //user validation
      if (!first_name) {
        errors.first_name = 'First name required';
      }
      if (!last_name) {
        errors.last_name = 'Last name required';
      }
      if (!email) {
        errors.email = 'Email required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email';
      }
      if (!pw) {
        errors.pw = 'Password required'
      } else if (pw.length < 8) {
        errors.pw = 'Password must be at least 8 characters'
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pw)) {
        errors.pw = 'Password must contain a lowercase letter, uppercase letter, number, and special character';
      }

      if(data[0]) {
        //if email exists
        errors.email = 'Email already exists';
        if (Object.keys(errors).length != 0) {
          return res.json(errors);
        } 
      } else {
        if (Object.keys(errors).length != 0) {
          return res.json(errors);
        } 
        //if email doesn't exist
        const hash = bcrypt.hashSync(pw, saltRounds);
        
        db.transaction(trx => {
          trx.insert({
            hash: hash,
            email: email
          })
          .into('login')
          .returning('email')
          .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                first_name: first_name,
                last_name: last_name,
                email: loginEmail[0]
              }, '*')
              .then(user => {
                res.json(user[0]);
              })
          })
          .then(trx.commit)
          .catch(trx.rollback)
        })
        .catch(err => {
          errors.register = 'unable to register';
          res.json(errors);
        });
      }
    })

}

module.exports = {
  handleRegister
}